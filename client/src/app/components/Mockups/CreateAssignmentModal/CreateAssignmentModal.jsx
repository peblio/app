import React, { useState } from 'react';
import './createAssignmentModal.scss';

import Modal from '../../Modal/Modal';
import InputField from '../../InputField/InputField';
import Dropdown from '../../Dropdown/Dropdown';
import TextareaField from '../../TextareaField/TextareaField';
import IconButton from '../../IconButton/IconButton';
import Button from '../../Button/Button';
import DatePickerField from '../../DatePickerField/DatePickerField';
// import LessonListCard from '../../LessonListCard/LessonListCard';

import ForkSVG from '../../../images/fork.svg';
import FileSVG from '../../../images/file.svg';

const CreateAssignmentModal = () => {
  const [classState, setClassState] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date());
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [instruction, setInscruction] = useState('');

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
          <IconButton icon={<FileSVG />} style={{ marginRight: '16px' }}>Select Pebl</IconButton>
          <IconButton icon={<ForkSVG />} style={{ marginRight: '16px' }}>Create new Pebl</IconButton>
          <IconButton icon={<ForkSVG />} style={{ marginRight: 'auto' }}>Add link</IconButton>
          <Button style={{ marginRight: '16px' }} className="secondary">Cancel</Button>
          <Dropdown
            placeholder="Publish"
            className="btn"
            style={{ width: '126px' }}
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
      </form>
    </Modal>
  );
};

export default CreateAssignmentModal;
