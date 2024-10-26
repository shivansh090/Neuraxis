export default function HomeWorks() {
    const processes = [
      {
        title: "Audio/Text to ISL",
        stages: [
          {
            number: 1,
            title: "Input Stage",
            description: "Users provide audio/text input. Audio is converted to text via speech recognition.",
          },
          {
            number: 2,
            title: "NLP Stage",
            description: "The text is tokenized using Bag of Words, preparing it for translation.",
          },
          {
            number: 3,
            title: "Mapping Stage",
            description: "Tokenized words are matched to ISL gesture images using a dictionary.",
          },
          {
            number: 4,
            title: "Output Stage",
            description: "The ISL gestures are displayed as an image array on the website.",
          },
        ],
      },
      {
        title: "ISL to Audio/Text",
        stages: [
          {
            number: 1,
            title: "Input Stage",
            description: "Users provides ISL sign input via images.",
          },
          {
            number: 2,
            title: "Image Processing Stage",
            description: "OpenCV and Mediapipe capture and analyze hand gestures.",
          },
          {
            number: 3,
            title: "Classification Stage",
            description: "Gestures are classified using a Random Forest Classifier.",
          },
          {
            number: 4,
            title: "Generation Stage",
            description: "Signs are sequenced into a sentence via a Large Language Model (LLM).",
          },
        ],
      },
    ]
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {processes.map((process, index) => (
            <div key={index} className=" rounded-lg p-6">
              <h2 className="text-2xl font-bold  text-center mb-4">{process.title}</h2>
              <div className="space-y-4 flex flex-col items-center">
                {process.stages.map((stage) => (
                    <>
                    <div key={index} className="bg-zinc-900  text-white  p-1.5 rounded-xl flex items-center space-x-2">
                        <div className="bg-orange-500 text-white font-extrabold p-1 px-3 rounded-md">{stage.number}</div>
                        <span className="text-lg font-medium px-2.5">{stage.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 w-[65%] pb-8">{stage.description}</p>
                  </>
                //   <div key={stage.number} className="flex items-start space-x-4">



                //     <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                //       <span className="text-white font-bold text-xl">{stage.number}</span>
                //     </div>
                //     <div className="flex-grow">
                //       <h3 className="text-lg font-semibold">{stage.title}</h3>
                //       <p className="text-sm text-gray-600">{stage.description}</p>
                //     </div>
                //   </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }