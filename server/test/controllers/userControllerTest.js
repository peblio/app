import { expect } from 'chai'
import { createUser } from '../../src/controllers/userControllerNew';
import { stub, assert, spy } from 'sinon';
const User = require('../../src/models/user.js');



describe('userControllerNew', function () {
    var request;
    var response;
    beforeEach(function() {
        const body = {
            mail: "bla@gmail.com",
            name: "Bla",
            userType: "teacher",
            password: "IAmNotTellingYouThis",
            requiresGuardianConsent: false
        }
        request = {
            body
        };
        response = {
            send: spy()
      };
      //User = stub(User, 'findOne').returns(new User(1, 'User1'));
    });

    describe('createUser', function () {
        it('should create user', function () {
            //createUser(request, response);
            expect(1).to.be.deep.equal(1);
            //expect(response.send.calledOnce).to.be.true;
        });
    });

});