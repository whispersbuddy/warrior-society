import { Accordion } from 'react-bootstrap';
import classes from './AccordionBlock.module.css';
const AccordionBlock = ({ header, body, event }) => {
  return (
    <>
      <style>
        {`
        .faq-block .accordion-button{
          padding: 20px 5px !important;
          line-height:27px;
          font-size:13px !important;
          font-family:var(--ff-primary-semibold) !important;
          background-color:transparent !important;
          border:0px;
        }          
        .faq-block .accordion-button:focus{
          box-shadow: none !important;
        }
        .faq-block .accordion-button:not(.collapsed){
          background-color: var(--white-color) !important;
        }
        .faq-block .accordion-button:not(.collapsed){
          background-color: transparent !important;
        }
        .faq-block{
          border:0px;
          border-bottom:1px solid var(--main-color);
          background-color:transparent;
          border-radius:0px
        }
        .faq-block .accordion-body{
          padding:2px 5px 20px 5px;
        }
        .faq-block .accordion-body p{
        }
        .faq-block .accordion-button::after {
          filter: invert(31%) sepia(32%) saturate(1674%) hue-rotate(252deg) brightness(95%) contrast(87%);
        }
        .faq-block .accordion-button:not(.collapsed)::after {
          filter: invert(31%) sepia(32%) saturate(1674%) hue-rotate(252deg) brightness(95%) contrast(87%);
        }
        @media screen and (max-width:550px){
          .accordion-button{
            font-size:14px;
          }
        }
      `}
      </style>
      <div className={classes['accordion-item__wrapper']}>
        <Accordion.Item
          eventKey={event}
          className='faq-block'
        >
          <Accordion.Header className={classes['header-heading']}>
            {header}
          </Accordion.Header>
          <Accordion.Body>
            <div className={classes['divider-line']}></div>
            <p className={classes['body-content']}>{body}</p>
          </Accordion.Body>
        </Accordion.Item>
      </div>
    </>
  );
};

export default AccordionBlock;
