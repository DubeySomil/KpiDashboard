
import Footer from "./Footer";
import Header from "./Header";



const Base =({title="Welcome",children})=>{

    return(

        <div >

         <Header></Header>
          {children}

         {/* <Footer></Footer> */}


         <Footer></Footer>
        </div>

    )

}

export default Base;