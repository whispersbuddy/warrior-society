import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GiCrossedSwords } from 'react-icons/gi';
import {
  disciplineData,
  disciplineOptions,
  martialArtTypes,
} from '../../config/Data';
import { DropDown } from '../DropDown/DropDown';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea';
import classes from './DisciplineComponent.module.css';

const DisciplineComponent = ({
  discipline,
  setDiscipline,
  selectedDiscipline,
  setSelectedDiscipline,
  disciplineLabel = 'Discipline(s)',
}) => {
  return (
    <>
      <Row>
        {/* discipline section start */}
        <Col lg={12}>
          <DropDown
            value={disciplineOptions?.find(
              (ele) => ele?.value === discipline?.domain
            )}
            setter={(e) => {
              // setAnswers([]);

              // whole discipline data setup here
              setDiscipline({
                domain: e?.value,
                questions: disciplineData
                  .find((q) => q.value === e?.value)
                  ?.questions?.map((ele) => {
                    return {
                      question: ele?.question,
                      answer: '',
                      type: ele?.type,
                    };
                  }),
                physicalSkillLevel: '',
                knowledgeLevel: '',
                journey: '',
                ...(e?.value === 'martial arts' && {
                  martialArtType: '',
                }),
              });
              // whole discipline data setup here

              // selectdiscipline state for setting each object of selectedDiscipline
              setSelectedDiscipline(
                disciplineData.find((q) => q.value === e?.value)
              );
            }}
            options={disciplineOptions}
            label={disciplineLabel}
            labelLeftIcon={<GiCrossedSwords />}
            placeholder='Martial Arts Discipline'
            labelClassName={classes.labelStyle}
          />
        </Col>
        {discipline?.questions?.map((ele, index) => (
          <Col
            lg={12}
            className={classes.inputField}
          >
            {ele?.type === 'input' ? (
              <Input
                value={discipline?.questions?.[index]?.answer}
                setter={(e) => {
                  const temp = [...discipline?.questions];
                  temp[index] = {
                    answer: e,
                    question: ele?.question,
                    type: ele?.type,
                  };
                  setDiscipline({
                    ...discipline,
                    questions: temp,
                  });
                }}
                placeholder={ele?.question}
              />
            ) : ele?.type == 'dropdown' ? (
              <DropDown
                value={discipline?.questions?.[index]?.options?.find((ele) => {
                  return ele?.value == discipline?.questions?.[index]?.answer;
                })}
                setter={(e) => {
                  const temp = [...discipline?.questions];
                  temp[index] = {
                    answer: e?.value,
                    question: ele?.question,
                    type: ele?.type,
                  };
                  setDiscipline({
                    ...discipline,
                    questions: temp,
                  });
                }}
                options={discipline?.questions?.[index]?.options}
                placeholder={ele?.question}
              />
            ) : (
              <TextArea
                value={discipline?.questions?.[index]?.answer}
                setter={(e) => {
                  const temp = [...discipline?.questions];
                  temp[index] = {
                    answer: e,
                    question: ele?.question,
                    type: ele?.type,
                  };
                  setDiscipline({
                    ...discipline,
                    questions: temp,
                  });
                }}
                placeholder={ele?.question}
              />
            )}
          </Col>
        ))}
        {discipline && (
          <>
            <Col
              lg={12}
              className={classes.inputField}
            >
              <DropDown
                placeholder={'Physical Skill Level'}
                value={
                  // value is set in string form so we have to find the object of that string value
                  selectedDiscipline.physicalSkillLevel?.find(
                    (level) => level?.value == discipline?.physicalSkillLevel
                  )
                }
                setter={(e) =>
                  setDiscipline({
                    ...discipline,
                    physicalSkillLevel: e?.value,
                  })
                }
                options={selectedDiscipline?.physicalSkillLevel}
              />
            </Col>
            <Col
              lg={12}
              className={classes.inputField}
            >
              <DropDown
                placeholder={'Knowledge Level'}
                value={
                  // value is set in string form so we have to find the object of that string value
                  selectedDiscipline.knowledgeLevel?.find(
                    (level) => level?.value == discipline?.knowledgeLevel
                  )
                }
                setter={(e) =>
                  setDiscipline({
                    ...discipline,
                    knowledgeLevel: e?.value,
                  })
                }
                options={selectedDiscipline?.knowledgeLevel}
              />
            </Col>
            {discipline?.domain === 'martial arts' && (
              <Col
                lg={12}
                className={classes.inputField}
              >
                <DropDown
                  value={
                    // value is set in string form so we have to find the object of that string value
                    martialArtTypes?.find(
                      (ele) => ele?.value === discipline?.martialArtType
                    )
                  }
                  options={martialArtTypes}
                  placeholder={'Martial Arts Types'}
                  optionLabel={'label'}
                  optionValue={'value'}
                  setter={(e) => {
                    setDiscipline({
                      ...discipline,
                      martialArtType: e?.value,
                    });
                  }}
                  isSearchable={true}
                />
              </Col>
            )}
            <Col
              lg={12}
              className={classes.inputField}
            >
              <TextArea
                placeholder={'Journey'}
                value={discipline?.journey}
                setter={(e) =>
                  setDiscipline({
                    ...discipline,
                    journey: e,
                  })
                }
              />
            </Col>
          </>
        )}
        {/* discipline section end */}
      </Row>
    </>
  );
};

export default DisciplineComponent;
