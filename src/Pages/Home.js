import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Action from "./Action"
import Testimonial from "./Testimonial";
function Home(){
    return (
        <div>
            <Header/>
            <Hero/>
            <Features/>
            <Testimonial/>
            <Action/>
            <Footer/>
        </div>
    )
}
export default Home;