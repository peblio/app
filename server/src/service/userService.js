const User = require('../models/user.js');
const Contribution = require('../models/contribution.js');
const Page = require('../models/page.js');
const stripe = require("stripe")("sk_test_3na5tj3yVy0tO0BsOUj1wM4e00wQHONkBg");
import contributionConstants from '../payment/contributionConstants';

export function getUserProfile(req, res) {
  User.findOne({ name: req.params.userName }, (err, user) => {
    if (err || !user) {
      const statusCode = err ? 500 : 404;
      res.status(statusCode).send(err);
    } else {
      res.send({
        name: user.name,
        type: user.type,
        image: user.image,
        blurb: user.blurb,
        isOwner: !!(req.user && req.user.name && req.user.name === user.name)
      });
    }
  });
}

export function makePayment(req, res) {
  var planDefaults;
  if(req.body.contributeConstant){
    planDefaults = contributionConstants[req.body.contributeConstant];
  }else {
    planDefaults = contributionConstants['non-predefined-contribute'];
    planDefaults.price = req.body.amountInCents;
  }
  stripe.customers.create({
    name: req.body.name,
    source: req.body.id
  }).then(customer => {
    stripe.charges.create({ 
      amount: planDefaults.price,
      description: `Charge for ${req.body.contributeConstant} for customer ${req.body.name}`,
      currency: planDefaults.currency,
      customer: customer.id
    }).then(charge => {
      const contribution = new Contribution({ name: req.body.name , amountInCents: planDefaults.price, contributionId: planDefaults.name, stripeResponseId:  charge.id });
      return contribution.save((contributionSaveError) => {
        if (contributionSaveError) {
          return res.status(500).send(contributionSaveError);
        }
        return res.status(200).send(charge);
      });
    });
  });
}

export function getUserDetailsById(req, res) {
  return getUserById(req.params.userObjectId, res);
}

export function getUserDetailsForPage(req, res) {
  return Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err || !page) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    } else {
      return getUserById(page.user, res);
    }
  });
};

export function getUserDetailsForParentPage(req, res) {
  return Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err || !page) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    }
    Page.findOne({ id: page.parentId}, (parentPageRetrieveError, parentPage) => {
      if (parentPageRetrieveError || !parentPage) {
        const statusCode = parentPageRetrieveError ? 500 : 404;
        return res.status(statusCode).send(parentPageRetrieveError);
      }
      return getUserById(parentPage.user, res);
    });
  });
};

function getUserById(userId, res) {
  return User.findById(userId, (err, user) => {
    if (err || !user) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    }
    return res.status(200).send({
      name: user.name,
      type: user.type
    });
  });
}
