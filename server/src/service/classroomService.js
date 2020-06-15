import { buildClassroomDetailFromRequest, buildClassroomMember } from '../models/creator/classroomDetailCreator';
import ClassroomDetail from '../models/ClassroomDetail';
import ClassroomMember from '../models/ClassroomMember';
import ClassroomGrade from '../models/ClassroomGrade';
import ClassroomTopic from '../models/ClassroomTopic';

export async function createClassroomDetail(req, res) {
  try {
    const classroomDetail = buildClassroomDetailFromRequest(req, req.user._id.toString());
    const savedClassroomDetail = await classroomDetail.save();
    await buildClassroomMember(req.user._id.toString(), savedClassroomDetail._doc.id, 'teacher' ).save();
    return res.status(200).send({ ...savedClassroomDetail._doc });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomGrades(req, res) {
  try {
    const grades = await ClassroomGrade.find();
    return res.status(200).json(grades);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getClassroomTopics(req, res) {
  try {
    const classroomTopics = await ClassroomTopic.find({classroomId: req.params.id});
    return res.status(200).json(classroomTopics);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function saveClassroomGrade(req, res) {
  try {
    const grade = await new ClassroomGrade({name: req.body.name}).save();
    return res.status(200).json(grade);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function saveClassroomTopic(req, res) {
  try {
    const classroomTopic = await new ClassroomTopic({name: req.body.name, classroomId: req.body.classroomId}).save();
    return res.status(200).json(classroomTopic);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function getAllMyClassroomDetails(req, res) {
  try {
    const myClassroomDetails = await ClassroomDetail.find({
      user: req.user._id.toString()
    });
    return res.status(200).json(myClassroomDetails);
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
    }).populate('userDetail', 'name');
    myClassroomDetails.members = members;
    return res.status(200).json(myClassroomDetails);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

export async function joinClassroom(req, res) {
  try {
    const classroomMember = await ClassroomMember.findOne({
      user: req.user._id.toString(),
      classroomId: req.params.id
    });
    if(classroomMember) {
      return res.status(200).send();
    }
    await buildClassroomMember(req.user._id.toString(), req.params.id, 'student' ).save();
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}