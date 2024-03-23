
const FeatureText = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-[#9139ef] to-[#2575fc]  ">
        <div className="w-11/12 mx-auto px-8 flex justify-between items-center">
            <div className="w-[45%] flex flex-col gap-y-6 items-start justify-between">
                <h2 className="text-5xl text-white font-sans">
                    Conference
                </h2>

                <p className="text-lg font-serif text-white/60  ">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est aut quasi itaque placeat omnis sapiente voluptas explicabo sed iste tenetur! Sit amet unde dolore! Voluptatibus autem accusamus doloremque maiores officiis.
                </p>

                <a href="/lobby"
                    className='cursor-pointer py-2 px-3 bg-black text-white rounded-lg text-xl font-semibold font-mono hover:scale-95 transition-all duration-300'
                >
                    Conference
                </a>
            </div>

            <div className="w-[40%]">
                <img src="https://cdn.dribbble.com/users/1708816/screenshots/15637339/media/2ea4a194c3149189c2507d137f81a652.gif" 
                    className="rounded-lg"
                 alt="" />
            </div>
        </div>
    </div>
  );
}

export default FeatureText;
