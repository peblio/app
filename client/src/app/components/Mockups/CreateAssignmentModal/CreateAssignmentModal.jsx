import React, { useState, useEffect } from 'react';
import './createAssignmentModal.scss';

import Modal from '../../Modal/Modal';
import InputField from '../../InputField/InputField';
import Dropdown from '../../Dropdown/Dropdown';
import TextareaField from '../../TextareaField/TextareaField';
import IconButton from '../../IconButton/IconButton';
import Button from '../../Button/Button';
import DatePickerField from '../../DatePickerField/DatePickerField';

import CreateNewIcon from '../../../images/create_new.svg';
import PeblIcon from '../../../images/pebl.svg';
import LinkIcon from '../../../images/link.svg';

// resource types import
// import LessonListCard from '../../LessonListCard/LessonListCard';
import LinkPreviewCard from './LinkPreviewCard/LinkPreviewCard';

const CreateAssignmentModal = () => {
  // form states
  const [classState, setClassState] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState();
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [instruction, setInscruction] = useState('');

  // add link states
  const [addLink, setAddLink] = useState('');
  const [addLinkTriggered, setAddLinkTriggered] = useState(false);

  // resources state
  const [resourcesAdded, setResourcesAdded] = useState(false);
  // 0 for select pebl, 1 for create new pebl and 2 for link
  const [resourceType, setResourceType] = useState(-1);

  const linkInputClickOutside = (e) => {
    if (e.target.id === 'trigger-link' ||
    e.target.className === 'icon-button' ||
      e.target.className === 'icon-button__text' ||
      e.target.parentElement.className === 'icon-button__icon'
    ) {
      setTimeout(() => {
        document.removeEventListener('click', linkInputClickOutside);
      }, 0);
    } else if (e.target.id !== 'add-link' && e.target.id !== 'add-link-button') {
      // console.log(e.target.parentElement);
      setAddLinkTriggered(() => false);
      document.removeEventListener('click', linkInputClickOutside);
    }
  };

  useEffect(() => () => {
    // cleanup event listener if active and component is closed
    document.removeEventListener('click', linkInputClickOutside);
  }, []);

  return (
    <Modal
      header={(
        <React.Fragment>
          <div className="create-assignment-modal__header__title">
            Create Assignment
          </div>
          <span className="create-assignment-modal__header__sub-title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, excepturi?
          </span>
        </React.Fragment>
      )}
      modalClass="create-assignment-modal"
      modalClose={() => {}}
    >
      <div className="create-assignment-modal__required">
        *required
      </div>
      <form action="">
        <div className="create-assignment-modal__row">
          <Dropdown
            placeholder="*Select Class"
            style={{ width: '149px', marginTop: '26px', marginRight: '40px' }}
            state={classState}
            setState={setClassState}
            options={[
              {
                name: 'Class 10',
                value: 10
              },
              {
                name: 'Class 9',
                value: 9
              },
              {
                name: 'Class 8',
                value: 8
              }, {
                name: 'Class 7',
                value: 7
              },
              {
                name: 'Class 6',
                value: 6
              }
            ]}
          />
          <Dropdown
            placeholder="Select topic"
            style={{ width: '149px', marginTop: '26px', marginRight: '40px' }}
            state={topic}
            setState={setTopic}
            options={[
              {
                name: 'Topic 1',
                value: 10
              },
              {
                name: 'Topic 2',
                value: 9
              },
              {
                name: 'Topic 3',
                value: 8
              }, {
                name: 'Topic Lorem Ipsum dolar',
                value: 7
              },
            ]}
          />
          {/* All students dropdown */}
          {/* <Dropdown
            placeholder="All Students"
            disabled
            style={{ width: '149px', marginTop: '26px', marginRight: '40px' }}
            state={topic}
            setState={setTopic}
            options={[
              {
                name: 'Topic 1',
                value: 10
              },
              {
                name: 'Topic 2',
                value: 9
              },
              {
                name: 'Topic 3',
                value: 8
              }, {
                name: 'Topic Lorem Ipsum dolar',
                value: 7
              },
            ]}
          /> */}
          <DatePickerField
            state={date}
            setState={setDate}
            label="Due Date"
            containerWidth="171px"
          />
        </div>
        <div className="create-assignment-modal__row">
          <InputField
            state={assignmentTitle}
            onChange={(e) => { setAssignmentTitle(e.target.value); }}
            label="*Assignment title"
            placeholder="enter class name"
            containerWidth="100%"
          />
        </div>
        <div className="create-assignment-modal__row">
          <TextareaField
            state={instruction}
            onChange={(e) => { setInscruction(e.target.value); }}
            label="Instruction (optional)"
            placeholder="type instructions"
            style={{
              containerWidth: '100%',
              textareaHeight: '96px'
            }}
          />
        </div>
        <div className="create-assignment-modal__action-area">
          <IconButton
            icon={<PeblIcon />}
            style={{ marginRight: '16px' }}
          >
            Select Pebl
          </IconButton>
          <IconButton
            icon={<CreateNewIcon />}
            style={{ marginRight: '16px' }}
            onClick={() => {
              console.log('Trigger create popup');
            }}
          >
            Create new Pebl
          </IconButton>
          <IconButton
            icon={<LinkIcon />}
            style={{ marginRight: 'auto' }}
            id="trigger-link"
            onClick={() => {
              setAddLinkTriggered(state => !state);
              setTimeout(() => {
                if (document.querySelector('#add-link')) {
                  document.querySelector('#add-link').focus();
                }
              }, 0);
              document.addEventListener('click', linkInputClickOutside);
            }}
          >
            Add link
          </IconButton>
          <Button style={{ marginRight: '16px' }} className="secondary">Cancel</Button>
          <Dropdown
            placeholder="Publish"
            className="btn"
            style={{ width: '126px' }}
            disabled={!classState || !assignmentTitle}
            options={[
              {
                name: 'Publish',
                value: 'publish',
                onClick: () => { console.log('Publish'); }
              },
              {
                name: 'Save Draft',
                value: 'save',
                onClick: () => { console.log('Save Draft'); }
              },
            ]}
          />
        </div>
        { resourcesAdded && (
          <div className="create-assignment-modal__resource">
            {resourceType === 2 && (
              <LinkPreviewCard
                title="Deck: learning p5.js 101"
                previewURL="http://placekitten.com/200/200"
                removeAction={() => {
                  setResourcesAdded(false);
                  setResourceType(-1);
                }}
              />
            )}
          </div>
        )}
      </form>
      {
        addLinkTriggered && (
          <form
            className="create-assignment-modal__link-box"
            onSubmit={(e) => {
              e.preventDefault();
              setTimeout(() => {
                setResourcesAdded(() => true);
                setResourceType(() => 2);
                setAddLinkTriggered(false);
              }, 1000);
            }}
          >
            <InputField
              label="Link"
              containerWidth="305px"
              state={addLink}
              onChange={(e) => { setAddLink(e.target.value); }}
              placeholder="enter link"
              id="add-link"
            />
            <Button
              className="primary"
              style={{ marginLeft: '10px' }}
              id="add-link-button"
              type="submit"
            >
              Add
            </Button>
          </form>
        )
      }
    </Modal>
  );
};

export default CreateAssignmentModal;
