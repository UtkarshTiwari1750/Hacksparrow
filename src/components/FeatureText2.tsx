
const FeatureText2 = () => {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-white text-black">
          <div className="w-11/12 mx-auto px-8 flex flex-row-reverse justify-between items-center">
              <div className="w-[45%] flex flex-col gap-y-6 items-start justify-between">
                    <h2 className="text-5xl font-sans">
                        Design
                    </h2>
    
                    <p className="text-lg font-serif  ">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est aut quasi itaque placeat omnis sapiente voluptas explicabo sed iste tenetur! Sit amet unde dolore! Voluptatibus autem accusamus doloremque maiores officiis.
                    </p>
  
                    <a href="/design"
                        className='cursor-pointer py-2 px-4 bg-blue-950 text-white rounded-lg text-xl font-semibold font-mono hover:scale-95 transition-all duration-300'
                    >
                        Design
                    </a>
              </div>
  
              <div className="w-[40%]">
                  <img src="https://support.moqups.com/hc/article_attachments/360009924620" 
                      className="rounded-lg"
                   alt="" />
              </div>
          </div>
      </div>
    );
  }
  
  export default FeatureText2;
  