import { buildClassroomDetailFromRequest, buildClassroomMember, buildClassroomAssignment, buildModifiedClassroomAssignment } from '../models/creator/classroomDetailCreator';
import ClassroomDetail from '../models/ClassroomDetail';
import ClassroomMember from '../models/ClassroomMember';
import StripeCheckoutResponse from '../models/StripeCheckoutResponse';
import Subscriptions from '../models/Subscriptions';
import ClassroomStudentAssignmentAttempt from '../models/ClassroomStudentAssignmentAttempt';
import ClassroomTopic from '../models/ClassroomTopic';
import ClassroomAssignment from '../models/ClassroomAssignment';
import { ObjectId } from 'mongodb';
const stripe = require("stripe")(process.env.STRIPE_KEY);
const url = require('url');
const User = require('../models/user.js');

export async function createClassroomDetail(req, res) {
  try {
    const classroomDetail = buildClassroomDetailFromRequest(req, req.user._id.toString());
    const savedClassroomDetail = await classroomDetail.save();
    const myMemberShipDetail = await buildClassroomMember(req, savedClassroomDetail._doc.id, 'teacher').save();
    return res.status(200).send({ ...savedClassroomDetail._doc, myMemberShipDetail });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function editClassroomAssignment(req, res) {
  try {
    const existingClassroomAssignment = await ClassroomAssignment.findOne({ id: req.params.id });
    if (!existingClassroomAssignment) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.body.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    const modifiedClassroomAssignment = buildModifiedClassroomAssignment(req, existingClassroomAssignment);
    await modifiedClassroomAssignment.save();
    return res.status(200).json(modifiedClassroomAssignment.toJSON())
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomGrades(req, res) {
  try {
    const grades = await ClassroomStudentAssignmentAttempt.find();
    return res.status(200).json(grades);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomTopics(req, res) {
  try {
    const classroomTopics = await ClassroomTopic.find({ classroomId: req.params.id });
    return res.status(200).json(classroomTopics);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomStudentAttemptForAssignment(req, res) {
  try {
    const myAttemptForAssignment = await ClassroomStudentAssignmentAttempt
      .findOne({ assignmentId: req.params.id, user: req.user._id.toString() })
      .populate('comments.fromMember', 'firstName lastName');

    const classroomAssignment = await ClassroomAssignment.findOne({ id: myAttemptForAssignment.assignmentId });
    if (!myAttemptForAssignment) {
      return res.status(404).send();
    }
    const myAttemptForAssignmentJSON = myAttemptForAssignment.toJSON();
    if (!classroomAssignment.areGradesPublished) {
      delete myAttemptForAssignmentJSON.marksScored;
    }
    return res.status(200).json(myAttemptForAssignmentJSON);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomAllAttemptsForAssignment(req, res) {
  try {
    const classroomAssignment = (await ClassroomAssignment.findOne({ id: req.params.id }).populate('topicId').populate('classroomDetail')).toJSON();
    if (!classroomAssignment) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomAssignment.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    const allStudentsAttemptForAssignment = await ClassroomStudentAssignmentAttempt
      .find({ assignmentId: classroomAssignment.id })
      .populate('memberId')
      .populate('comments.fromMember');

    return res.status(200).json({
      allStudentsAttemptForAssignment,
      classroomAssignment: classroomAssignment.topicId
        ? { ...classroomAssignment, topicId: classroomAssignment.topicId._id, topicDetail: classroomAssignment.topicId }
        : classroomAssignment
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function saveClassroomAssignmentStudentAttempt(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.body.classroomId });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.body.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "student") {
      return res.status(401).send();
    }
    const classroomAssignment = await ClassroomAssignment.findOne({ id: req.body.assignmentId });
    if (!classroomAssignment) {
      return res.status(404).send();
    }
    if (classroomAssignment.type !== 'assignment') {
      return res.status(500).send({ error: 'Material cannot be attempted' });
    }
    const existingClassroomAssignmentStudentAttempt = await ClassroomStudentAssignmentAttempt.findOne({
      user: req.user._id.toString(),
      classroomId: req.body.classroomId,
      assignmentId: req.body.assignmentId
    });
    if (existingClassroomAssignmentStudentAttempt) {
      return res.status(500).send({ error: 'Assignment already attempted' });
    }
    const classroomAssignmentStudentAttempt = await new ClassroomStudentAssignmentAttempt({
      user: req.user._id.toString(),
      classroomId: req.body.classroomId,
      assignmentId: req.body.assignmentId,
      myPeblUrl: req.body.myPeblUrl,
      memberId: classroomMember._id.toString()
    }).save();
    return res.status(200).json(classroomAssignmentStudentAttempt);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function changeTurnInStatusOfClassroomAssignmentAttempt(req, res) {
  try {
    const classroomAssignment = await ClassroomAssignment.findOne({ id: req.params.id });
    if (!classroomAssignment) {
      return res.status(404).send();
    }
    if (classroomAssignment.type !== 'assignment') {
      return res.status(500).send({ error: 'Material cannot be attempted' });
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomAssignment.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "student") {
      return res.status(401).send();
    }
    const myClassroomAssignmentAttempt = await ClassroomStudentAssignmentAttempt.findOne({
      assignmentId: req.params.id,
      user: req.user._id.toString()
    });
    if (!myClassroomAssignmentAttempt) {
      return res.status(404).send();
    }
    myClassroomAssignmentAttempt.turnedIn = req.body.turnedIn;
    if (req.body.turnedIn) {
      myClassroomAssignmentAttempt.turnedInTime = Date.now();
    } else {
      myClassroomAssignmentAttempt.turnedInTime = null;
    }
    await myClassroomAssignmentAttempt.save();
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function addCommentOnClassroomAssignmentAttempt(req, res) {
  try {
    const classroomAssignmentAttempt = await ClassroomStudentAssignmentAttempt
      .findById(new ObjectId(req.body.assignmentAttemptId))
      .populate('assignmentDetail');
    if (!classroomAssignmentAttempt) {
      return res.status(404).send();
    }
    const classroomAssignmentAttemptJson = classroomAssignmentAttempt.toJSON();
    if (classroomAssignmentAttemptJson.assignmentDetail.type !== 'assignment') {
      return res.status(500).send({ error: 'Material cannot be attempted' });
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomAssignmentAttemptJson.assignmentDetail.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (!(classroomMember.role === "student" || classroomMember.role === "teacher")) {
      return res.status(401).send();
    }
    classroomAssignmentAttempt.comments.push({
      fromMember: classroomMember._id.toString(),
      text: req.body.text,
    })
    await classroomAssignmentAttempt.save();
    return res.status(200).send(classroomAssignmentAttempt);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function gradeClassroomAssignmentAttempt(req, res) {
  try {
    const classroomAssignmentAttempt = await ClassroomStudentAssignmentAttempt
      .findById(new ObjectId(req.body.assignmentAttemptId))
      .populate('assignmentDetail');
    if (!classroomAssignmentAttempt) {
      return res.status(404).send();
    }
    const classroomAssignmentAttemptJson = classroomAssignmentAttempt.toJSON();
    if (classroomAssignmentAttemptJson.assignmentDetail.type !== 'assignment') {
      return res.status(500).send({ error: 'Material cannot be attempted' });
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomAssignmentAttemptJson.assignmentDetail.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    classroomAssignmentAttempt.marksScored = req.body.marksScored;
    await classroomAssignmentAttempt.save();
    return res.status(200).send(classroomAssignmentAttempt);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function saveClassroomTopic(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.body.classroomId });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.body.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    const existingClassroomTopic = await ClassroomTopic.findOne({ name: req.body.name, classroomId: req.body.classroomId });
    if (existingClassroomTopic) {
      return res.status(400).json(classroomTopic);
    }
    const classroomTopic = await new ClassroomTopic({ name: req.body.name, classroomId: req.body.classroomId }).save();
    return res.status(200).json(classroomTopic);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function editClassroomTopicName(req, res) {
  try {
    const classroomTopic = await ClassroomTopic.findById(req.body.id);
    if (!classroomTopic) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomTopic.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    await ClassroomTopic.update(
      { _id: req.body.id },
      {
        name: req.body.name
      });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function deleteClassroomTopic(req, res) {
  try {
    const classroomTopic = await ClassroomTopic.findById(req.params.id);
    if (!classroomTopic) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomTopic.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    const classroomAssignmentsWithTopic = await ClassroomAssignment.find({
      topicId: req.params.id
    });
    if (classroomAssignmentsWithTopic.length > 0) {
      return res.status(400).send();
    }
    await ClassroomTopic.deleteOne({ _id: req.params.id });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function saveClassroomAssignment(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.body.classroomId });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.body.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    if (req.body.topicId) {
      const classroomTopic = await ClassroomTopic.findOne({
        _id: req.body.topicId
      });
      if (!classroomTopic) {
        return res.status(400).send();
      }
    }
    const classroomAssignment = buildClassroomAssignment(req);
    const savedClassroomAssignment = await classroomAssignment.save();
    return res.status(200).json(savedClassroomAssignment);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function publishClassroomAssignment(req, res) {
  try {
    const classroomAssignment = await ClassroomAssignment.findOne({ id: req.body.assignmentId });
    if (!classroomAssignment) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomAssignment.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    await ClassroomAssignment.update(
      { id: req.body.assignmentId },
      {
        isPublished: req.body.isPublished
      });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function publishGradesForClassroomAssignment(req, res) {
  try {
    const classroomAssignment = await ClassroomAssignment.findOne({ id: req.body.assignmentId });
    if (!classroomAssignment) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomAssignment.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    await ClassroomAssignment.update(
      { id: req.body.assignmentId },
      {
        areGradesPublished: true
      });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function reassignTopicToAssignment(req, res) {
  try {
    const classroomAssignment = await ClassroomAssignment.findOne({ id: req.body.assignmentId });
    if (!classroomAssignment) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: classroomAssignment.classroomId
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    if (req.body.newTopicId) {
      const classroomTopic = await ClassroomTopic.findOne({ _id: req.body.newTopicId, classroomId: classroomAssignment.classroomId });
      if (!classroomTopic) {
        return res.status(404).send();
      }
      await ClassroomAssignment.update(
        { id: req.body.assignmentId },
        {
          topicId: classroomTopic._id
        });
    } else {
      await ClassroomAssignment.update(
        { id: req.body.assignmentId },
        {
          topicId: null
        });
    }
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomAssignment(req, res) {
  try {
    const classroomAssignment = await ClassroomAssignment.findOne({ id: req.params.id }).populate('topicId');
    const classroomAssignmentJson = classroomAssignment.topicId
      ? { ...classroomAssignment.toJSON(), topicId: classroomAssignment.toJSON().topicId._id, topicDetail: classroomAssignment.toJSON().topicId }
      : classroomAssignment.toJSON()
    return res.status(200).json(classroomAssignmentJson);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

async function populateTotalStudents(classroomAssignment) {
  if (classroomAssignment.type === 'material') {
    return classroomAssignment
  }
  const studentMembers = await ClassroomMember.find({
    classroomId: classroomAssignment.classroomId,
    role: 'student'
  });
  classroomAssignment.totalStudentCount = studentMembers.length;
  return classroomAssignment;
}

async function populateStudentsWhoHaveTurnedInAssignmentCount(classroomAssignment) {
  if (classroomAssignment.type === 'material') {
    return classroomAssignment
  }
  const studentsWhoHaveTurnedInAssignment = await ClassroomStudentAssignmentAttempt.find({
    assignmentId: classroomAssignment.id,
    turnedIn: true
  });
  classroomAssignment.assignmentTurnedInStudentCount = studentsWhoHaveTurnedInAssignment.length;
  return classroomAssignment;
}

async function populateStudentsWhoHaveAttemptedAssignmentCount(classroomAssignment) {
  if (classroomAssignment.type === 'material') {
    return classroomAssignment
  }
  const studentsWhoHaveTurnedInAssignment = await ClassroomStudentAssignmentAttempt.find({
    assignmentId: classroomAssignment.id
  });
  classroomAssignment.assignmentAttemptedStudentCount = studentsWhoHaveTurnedInAssignment.length;
  return classroomAssignment;
}

export async function getAllAssignmentsInClassroom(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.params.id });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.params.id
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    const classroomAssignments = await ClassroomAssignment.find({ classroomId: req.params.id }).populate('topicId');
    const classroomAssignmentsJson = await Promise.all(classroomAssignments
      .map(classroomAssignment => classroomAssignment.toJSON())
      .map(classroomAssignment => {
        if (classroomAssignment.topicId) {
          return { ...classroomAssignment, topicId: classroomAssignment.topicId._id, topicDetail: classroomAssignment.topicId };
        }
        return classroomAssignment;
      })
      .map(async classroomAssignment => populateTotalStudents(await classroomAssignment))
      .map(async classroomAssignment => populateStudentsWhoHaveTurnedInAssignmentCount(await classroomAssignment))
      .map(async classroomAssignment => populateStudentsWhoHaveAttemptedAssignmentCount(await classroomAssignment)));
    return res.status(200).json(classroomAssignmentsJson);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getAllAssignmentsInClassroomForStudent(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.params.id });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.params.id
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "student") {
      return res.status(401).send();
    }
    const assignmentsAttemptedByStudentWithMarks = await ClassroomStudentAssignmentAttempt
      .find({
        classroomId: req.params.id,
        user: req.user._id.toString()
      })
      .populate('assignmentDetail');
    const assignmentsAttemptedByStudent = assignmentsAttemptedByStudentWithMarks
      .map(assignmentAttemptedByStudent => assignmentAttemptedByStudent.toJSON())
      .map(assignmentAttemptedByStudent => maskMarks(assignmentAttemptedByStudent));

    const classroomAllAssignmentsAndMaterials = await ClassroomAssignment.find({ classroomId: req.params.id, isPublished: true });
    return res.status(200).json({ assignmentsAttemptedByStudent, classroomAllAssignmentsAndMaterials });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
}

export async function hasClassroomCreateAccess(req, res) {
  try {
    const userEmail = req.user.email;
    const subscriptions = await Subscriptions.findOne({isActive: true, email: userEmail});
    if(subscriptions) {
      return res.send(200); 
    }
    return res.send(401);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
}

export async function getMemoryAllowed(req, res) {
  try {
    const userEmail = req.user.email;
    const subscriptions = await Subscriptions.findOne({isActive: true, email: userEmail});
    if(!subscriptions) {
      return 524288000; 
    } else {
      return 5368709000;
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
}

async function handleCheckoutSession(session, hasSucceeded) {
  console.log('session: ', session);
  const stripeCheckoutResponse = new StripeCheckoutResponse({
    email: session.customer_email,
    success: hasSucceeded,
    payload: session,
  });
  await stripeCheckoutResponse.save();
  if( hasSucceeded ){
    const subscriptions = new Subscriptions({
      email: session.customer_email,
      amount: session.amount_total,
      paidDate: Date.now(),
      isActive: true,
    });
    await subscriptions.save();
  }
}

export async function processClassroomPayment(request, response) {
  try {
    const sig = request.headers['stripe-signature'];
    let event;
    event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_WEBHOOK_SIGNING_KEY);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('signature: ', sig);
      await handleCheckoutSession(session, true);
    } else {
      await handleCheckoutSession(session, false);
    }
    response.json({ received: true });
  } catch (err) {
    console.error(err);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
}

function maskMarks(assignmentAttemptedByStudent) {
  if (!assignmentAttemptedByStudent.assignmentDetail.areGradesPublished) {
    delete assignmentAttemptedByStudent.marksScored;
  }
  delete assignmentAttemptedByStudent.assignmentDetail;
  return assignmentAttemptedByStudent;
}

export async function getAllAssignmentsInClassroomByStudentForTeacher(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.params.id });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.params.id
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    const memberId = url.parse(req.url, true).query.memberId;
    const studentMembershipDetails = await ClassroomMember.findById(new ObjectId(memberId));
    if (!studentMembershipDetails) {
      return res.status(404).send();
    }
    if (studentMembershipDetails.role !== "student") {
      return res.status(401).send();
    }
    if (studentMembershipDetails.classroomId !== req.params.id) {
      return res.status(401).send();
    }
    const allClassroomAssignmentsAttemptedByStudent = await ClassroomStudentAssignmentAttempt
      .find({ classroomId: req.params.id, user: studentMembershipDetails.user.toString() })
      .populate('assignmentDetail');
    const classroomAssignments = await ClassroomAssignment.find({ classroomId: req.params.id }).populate('topicId');
    const classroomAssignmentsJson = classroomAssignments
      .map(classroomAssignment => classroomAssignment.toJSON())
      .map(classroomAssignment => {
        if (classroomAssignment.topicId) {
          return { ...classroomAssignment, topicId: classroomAssignment.topicId._id, topicDetail: classroomAssignment.topicId }
        }
        return classroomAssignment;
      })
    return res.status(200).json({ allClassroomAssignmentsAttemptedByStudent, allClassroomAssignmentsInClassroom: classroomAssignmentsJson });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

async function populateClassRoomStudentMemberListCount(myClassroom) {
  const studentMembers = await ClassroomMember.find({
    classroomId: myClassroom.id,
    role: 'student'
  });
  myClassroom.studentMemberCount = studentMembers.length;
  return myClassroom;
}

async function populateMyMembershipInClassroomDetail(myClassroom, classroomMemberShipList) {
  myClassroom.myMemberShipDetail = classroomMemberShipList.filter(classroomMemberShip => classroomMemberShip.classroomId === myClassroom.id).pop();
  return myClassroom
}

export async function getAllMyClassroomDetails(req, res) {
  try {
    const classroomMemberShipList = await ClassroomMember.find({
      user: req.user._id.toString()
    });
    if (!classroomMemberShipList) {
      return res.status(404).send();
    }
    const classroomMemberShipIdList = classroomMemberShipList.map(classroomMemberShip => classroomMemberShip.classroomId);
    const myClassroomDetails = await ClassroomDetail.find().where('id').in(classroomMemberShipIdList).exec();

    const myClassroomDetailsWithMemberCounts = await Promise.all(myClassroomDetails
      .map(myClassroom => myClassroom.toJSON())
      .map(myClassroom => populateMyMembershipInClassroomDetail(myClassroom, classroomMemberShipList))
      .map(async myClassroom => populateClassRoomStudentMemberListCount(await myClassroom)));

    return res.status(200).json(myClassroomDetailsWithMemberCounts);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomDetail(req, res) {
  try {
    const myClassroomDetails = await ClassroomDetail.findOne({
      id: req.params.id
    });
    const members = await ClassroomMember.find({
      classroomId: req.params.id
    });
    myClassroomDetails.members = members;
    return res.status(200).json(myClassroomDetails);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function joinClassroom(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.body.classroomId });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.body.classroomId,
    });
    if (classroomMember) {
      return res.status(500).send();
    }
    await buildClassroomMember(req, req.body.classroomId, 'student').save();
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function addMemberToClassroom(req, res) {
  try {
    const classroom = await ClassroomDetail.findOne({ id: req.params.id });
    if (!classroom) {
      return res.status(404).send();
    }
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.params.id
    });
    if (!classroomMember) {
      return res.status(404).send();
    }
    if (classroomMember.role !== "teacher") {
      return res.status(401).send();
    }
    const usersWithIdentifier = await User.find({ $or: [{ name: req.body.identifier }, { email: req.body.identifier }] });
    if (usersWithIdentifier.length > 1) {
      return res.status(400).send();
    }
    if (usersWithIdentifier.length == 0) {
      return res.status(404).send();
    }
    const classroomMemberToBeAdded = new ClassroomMember({
      user: usersWithIdentifier[0]._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      classroomId: req.params.id,
      role: req.body.role,
      isActive: true
    });
    const isAlreadyAMember = await ClassroomMember.findOne({ user: classroomMemberToBeAdded.user, classroomId: req.params.id });
    if (isAlreadyAMember) {
      return res.status(200).send();
    }
    await classroomMemberToBeAdded.save();
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}