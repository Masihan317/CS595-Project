import { MdOutlineDocumentScanner } from "react-icons/md";
import { PiCardsBold } from "react-icons/pi";
import { RiRobot3Line } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row py-3 px-3">
        <Carousel>
          <Carousel.Item className="position-relative">
            <img className="w-100" src="/summarization.png" alt="Summarization Banner Image" />
            <div className="position-absolute top-50 start-0 translate-middle-y ps-5 text-start text-dark-emphasis" style={{ maxWidth: "40%" }}>
              <h3>From Pages to Pointers - Instantly.</h3>
              <p class="carousel-body-text">Quickly distill lengthy articles, essays, or notes into easy-to-digest summaries so you can focus on learning, not skimming.</p>
              <Link to="/summarization" className="btn btn-warning">Try Summarizer</Link>
            </div>
          </Carousel.Item>
          <Carousel.Item className="position-relative">
            <img className="w-100" src="/flashcards.png" alt="Flashcards Banner Image" />
            <div className="position-absolute top-50 right-0 end-0 translate-middle-y pe-5 text-end text-dark-emphasis" style={{ maxWidth: "35%" }}>
              <h3>Turn Notes into Knowledge.</h3>
              <p class="carousel-body-text">Automatically create flashcards from any text or document — perfect for fast reviews, self-quizzing, and deep understanding.</p>
              <Link to="/flashcards" className="btn btn-warning">Try Flashcard Generator</Link>
            </div>
          </Carousel.Item>
          <Carousel.Item className="position-relative">
            <img className="w-100" src="/chatbot.png" alt="Chatbot Banner Image" />
            <div className="position-absolute top-50 right-0 end-0 translate-middle-y pe-5 text-end text-dark-emphasis" style={{ maxWidth: "50%" }}>
              <h3>Study Help, On Demand.</h3>
              <p class="carousel-body-text">
                Ask your AI buddy anything, from complex topics to simple clarifications, and get clear, tailored answers in real time.
              </p>
              <Link to="/chatbot" className="btn btn-warning">Try Chatbot</Link>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="row py-3 px-3">
        <section class="row display-flex justify-content-evenly mb-3">
          <div class="col-md mt-3">
            <MdOutlineDocumentScanner className="h1 text-primary" />
            <h3 class="h5">Instant Summarization</h3>
            <p class="main-body-text text-secondary">Turn long readings into bite-sized summaries in seconds. Stay focused on what matters most — understanding the core ideas.</p>
          </div>
          <div class="col-md mt-3">
            <PiCardsBold className="h1 text-success" />
            <h3 class="h5">Smart Flashcard Generator</h3>
            <p class="main-body-text text-secondary">Automatically generate study-ready flashcards from any text or PDF. Flip, review, and master key concepts faster than ever.</p>
          </div>
          <div class="col-md mt-3">
            <RiRobot3Line className="h1 text-danger" />
            <h3 class="h5">Ask Me Anything</h3>
            <p class="main-body-text text-secondary">Stuck on a topic? Chat with your AI buddy to get clear, instant answers and explanations tailored to your study material.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home