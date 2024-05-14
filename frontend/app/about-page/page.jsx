import React from 'react';
import './about.scss';

const About = () => {
  return (
    <div className='about-container'>
      <h1 className='about-h1'>About Us</h1>
      <img src="/images/group.png" alt="About Us" className="about-image" />
      <p className='about-para'>Welcome to MCS5, where we harness the power of advanced technology to 
        bring you personalized laptop recommendations tailored to your unique needs and budget. Our 
        mission is to simplify your laptop purchasing journey by leveraging user-generated content 
        and cutting-edge natural language processing.</p>

      <h2 className='about-h2'>Who We Are</h2>
      <p className='about-para'>We are a group of final year students from Monash University Malaysia, united by our passion
         for technology and innovation. As part of our final year project, we have combined our diverse
          backgrounds and expertise to provide you with accurate and insightful recommendations that
           cater to your specific requirements.</p>

      <h2 className='about-h2'>What We Do</h2>
      <p className='about-para'>We recognize that choosing the right laptop can be overwhelming 
        given the vast array of options available. To make this process easier, we've developed an 
        intelligent recommender system that analyzes user reviews on Reddit—a platform rich with genuine
         user experiences and feedback. By processing and interpreting this content, we extract valuable
          insights to guide you towards the best laptop for your particular use case and budget.</p>

      <h2 className='about-h2'>Our Approach</h2>
      <p className='about-para'>Our approach combines state-of-the-art natural language processing and statistical analysis.
         We employ two key models to ensure precise and personalized recommendations:</p>

      <h3 className='about-h3'>Intent Recognition Model</h3>
      <p className='about-para'>This model identifies and understands the specific needs and preferences expressed by users in their reviews. 
        Whether you're looking for a laptop for gaming, work, study, or creative pursuits, 
        our intent recognition model captures the nuances of user intent to better match your requirements.</p>

      <h3 className='about-h3'>Aspect Extraction Model</h3>
      <p className='about-para'>This model focuses on extracting detailed aspects of laptop performance and features discussed in reviews,
         such as battery life, graphics quality, portability, and more. By understanding what users like or dislike about 
         specific aspects, we can provide more comprehensive and targeted recommendations.</p>
    </div>
  );
}

export default About;