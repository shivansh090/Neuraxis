
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/images/bg.png';
import { Info } from 'lucide-react';

export default function Text2ISL() {
    const homeRef = useRef(null);
    const worksRef = useRef(null);
    const demoRef = useRef(null);
    const featuresRef = useRef(null);

    const [textInput, setTextInput] = useState('');
    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);
    const videoPlayerRef = useRef(null);
    const [videoError, setVideoError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const navigate = useNavigate();

    let retryCount = 0;
    const maxRetries = 3;

    const record = () => {
        console.log("Starting speech recognition");

        if (!window.webkitSpeechRecognition) {
            console.error("Speech recognition not supported in this browser");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-IN';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Transcript:", transcript);
            setTextInput(transcript);
            retryCount = 0; // Reset retry count on successful recognition
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);

            if (event.error === 'network' && retryCount < maxRetries) {
                retryCount++;
                setTimeout(record, 2000); // Retry after 2 seconds
            } else {
                console.error("Max retries reached or a non-network error occurred");
            }
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
        };

        recognition.start();
    };


    const callAnimationApi = async () => {
        setIsLoading(true);
        setVideoError(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/animation/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token 4675ef45f020a1ad80a920b9cc1cf5006eadd703`
                },
                body: JSON.stringify({ sen: textInput })
            });

            if (response.ok) {
                const data = await response.json();
                setWords(data.words || []);
                setCurrentWordIndex(-1);
                setIsPlaying(false);
            } else {
                console.error('Failed to fetch animation data');
                setVideoError('Failed to fetch animation data. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setVideoError('An error occurred while fetching data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        callAnimationApi();
    };

    const playPause = () => {
        if (isPlaying) {
            videoPlayerRef.current.pause();
            setIsPlaying(false);
        } else {
            if (currentWordIndex === -1 || currentWordIndex >= words.length) {
                setCurrentWordIndex(0);
            }
            setIsPlaying(true);
        }
    };

    const playNextVideo = () => {
        if (currentWordIndex < words.length) {
            setVideoError(null);
            const currentWord = words[currentWordIndex];

            if (currentWord) {
                // Preload the next video if it exists
                const nextWordIndex = currentWordIndex + 1;
                if (nextWordIndex < words.length) {
                    const nextVideoSrc = getVideoPath(words[nextWordIndex]);
                    if (nextVideoSrc) {
                        const nextVideo = document.createElement('video');
                        nextVideo.src = nextVideoSrc;
                        nextVideo.load(); // Preload
                    }
                }

                const videoSrc = getVideoPath(currentWord);
                if (videoSrc) {
                    videoPlayerRef.current.src = videoSrc;
                    videoPlayerRef.current.play().catch(error => {
                        console.error('Error playing video:', error);
                        setVideoError(`Error playing video: ${currentWord}. Please check the video files.`);
                        handleVideoEnd();
                    });
                } else {
                    setVideoError(`No video found for: ${currentWord}`);
                    handleVideoEnd();
                }
            } else {
                setVideoError('No word found at current index.');
                setIsPlaying(false);
            }
        } else {
            setIsPlaying(false);
            setCurrentWordIndex(-1);
        }
    };


    const getVideoPath = (word) => {
        if (typeof word !== 'string') {
            console.error('Invalid word:', word);
            return null;
        }
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return `${process.env.PUBLIC_URL}/videos/${capitalizedWord}.mp4`;
    };

    const handleVideoEnd = () => {
        setCurrentWordIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < words.length) {
                return nextIndex;
            } else {
                setIsPlaying(false);
                return -1;
            }
        });
    };

    useEffect(() => {
        const videoPlayer = videoPlayerRef.current;

        videoPlayer.addEventListener('ended', handleVideoEnd);

        return () => {
            videoPlayer.removeEventListener('ended', handleVideoEnd);
        };
    }, [words]);

    useEffect(() => {
        if (isPlaying && currentWordIndex >= 0 && currentWordIndex < words.length) {
            playNextVideo();
        }
    }, [currentWordIndex, isPlaying]);

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="min-h-screen bg-repeat" style={{ backgroundImage: `url(${bg})` }}>
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-1 ml-1 mb-4" role="alert">
                <div className="flex">
                    <div className="py-1">
                        <Info className="h-6 w-6 text-blue-500 mr-4" />
                    </div>
                    <div>
                        <p className="font-bold">Demonstrational Version</p>
                        <p className="hidden sm:block">
                            {process.env.REACT_APP_INFO_DESC}
                        </p>
                        {/* Show "Show More/Less" on smaller screens */}
                        <div className="sm:hidden">
                            <button
                                onClick={toggleDescription}
                                className="text-blue-500 text-sm"
                            >
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </button>
                            {isExpanded && (
                                <p className="mt-2">
                                    This is just for deployment. The Django model is available in my README but its deployment is paid, so for demonstration, I created another simple Express API without ML. Also, authentication is disabled for demo.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <header className="">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-gray-900">neur<span className='text-orange-500'>axis.</span> </span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => navigate('/', { replace: true })} className="bg-orange-500 text-white rounded-md px-3 py-2 text-sm font-medium">
                                Home
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="max-w-6xl flex flex-col mx-auto px-4">
                <section ref={demoRef} className="pt-8 pb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Audio/Text Input to ISL Output</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                                <h3 className="font-semibold text-white mb-2">Audio Input</h3>
                                <button
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                    onClick={record}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                    </svg>
                                    Record Speech
                                </button>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                                <h3 className="font-semibold text-white mb-2">Text Input</h3>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Enter your text input here"
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                    />
                                    <button
                                        className="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 disabled:opacity-50"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Loading...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <ul className="mt-4 flex flex-wrap" aria-label="Word list">
                                    {words.map((word, index) => (
                                        <li
                                            key={index}
                                            className={`mr-2 mb-2 px-2 py-1 rounded ${index === currentWordIndex ? 'bg-orange-500 text-white ' : 'bg-gray-300'}`}
                                        >
                                            {word}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-200 max-h-[400px] max-w-[600px] relative overflow-hidden rounded-lg ">
                            <video className='' autoPlay={true} ref={videoPlayerRef} width="600" height="330" preload="auto"></video>
                            <button
                                className="mt-2 px-4 absolute bottom-3 right-[50px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                                onClick={playPause}
                                disabled={isLoading || words.length === 0}
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                            {videoError && (
                                <p className="text-red-500 mt-2" role="alert">{videoError}</p>
                            )}

                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-zinc-900 text-white text-center py-8">
                <p>Copyright @Neuraxis.com</p>
            </footer>
        </div>
    );
}