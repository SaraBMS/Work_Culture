import React, { useState, useEffect } from 'react';
import './aboutus.css';
import BoxContainer from './home/BoxContainer';
import axios from 'axios';
import useAxiosFetch from '../../hook/useAxiosFetch';

const Aboutus = () => {
  const { fetchError, isLoading } = useAxiosFetch('http://localhost:3400/DashboardAPI');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [faqs, setFaqs] = useState([
    { id: 1, message: 'How does this work?', answer: 'Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.' },
    { id: 2, message: 'Are there any additional fees?', answer: 'Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.' },
    { id: 3, message: 'How can I get the app?', answer: 'Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.' },
    { id: 4, message: 'What features do you offer that others do not?', answer: 'Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.' }
  ]);

  const handleShowAnswer = (id) => {
    setOpenFAQ(prevOpenFAQ => prevOpenFAQ === id ? null : id);
  }

  const fetchMoreFaqs = async () => {
    try {
      const response = await axios.get('https:/FAQS');
      if (Array.isArray(response.data)) {
        setFaqs(prevFaqs => [...prevFaqs, ...response.data]);  // Appending new FAQs to existing ones
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchMoreFaqs();
  }, []); 


  return (
    <div className='aboutus'>
      <BoxContainer filled>
        <div className="aboutus-container">
          <div className="aboutus-container-header">
            <h1>Our Ethics</h1>
          </div>
          <div className="aboutus-container-bio">
            <p>
              Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
              mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus,
              ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
              Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
              Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis
              convallis diam sit amet lacinia. Aliquam in elementum tellus.ur vel bibendum lorem. Morbi 
              convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.ante pulvinar.
              Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum 
              lorem. Morbi convallis convallis diam sit amet lacinia. 
            </p>
          </div>
          {isLoading && <p className='statusMsg'>Loading faqs...</p>}
            {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
            {!isLoading && !fetchError && 
          <div className="faq-container">
            <div className="faq-container-header">
              <h1>FAQ</h1>
            </div>
            <div className="faq-container-questions">
              {faqs.map(faq => (
                <div key={faq.id} className="faq-container-questions-content">
                  <div className="faq-container-questions-content-qa">
                    <p className="faq-container-questions-content-qa-question">
                      {faq.message}
                    </p>
                    <p className={`faq-container-questions-content-qa-answer ${openFAQ === faq.id ? 'show' : ''}`}>
                      {faq.answer}
                    </p>
                  </div>
                  <div className="faq-container-questions-content-button">
                    <button type='button' onClick={() => handleShowAnswer(faq.id)}>
                      {openFAQ === faq.id ?
                        <svg width="18" height="3" viewBox="0 0 18 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.07568 1.41797H16.4615" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        :
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.86853 8.93066H17.2544" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.56189 1L9.56189 18.8594" stroke="#FEFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      }
                    </button>
                  </div>
                </div>
              ))}
              <div className="faq-container-questions-more_faqs">
                <button type='button' onClick={fetchMoreFaqs}>
                  <span>More FAQs</span>
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="faq-gradient" gradientTransform="rotate(103.18)">
                          <stop offset="-41.67%" stopColor="#00FEFC" />
                          <stop offset="141.58%" stopColor="#0002FE" />
                        </linearGradient>
                      </defs>
                      <path d="M0.155396 5.27618H10.1229M10.1229 5.27618L6.22255 0.957031M10.1229 5.27618L6.22255 10.1352" stroke="url(#faq-gradient)" strokeWidth="2" />
    `           </svg>
                </button>
              </div>
            </div>
          </div>}
        </div>
      </BoxContainer>
    </div>
  )
}

export default Aboutus;
