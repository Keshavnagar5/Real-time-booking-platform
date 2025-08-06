import React, { useEffect, useRef, useState, useContext } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null);

    const navigate = useNavigate();

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    useEffect(() => {
        if (user?._id) {
            socket.emit("join", { userType: "user", userId: user._id });
        }
    }, [user, socket]);

    // --- FIX: Socket listeners moved into useEffect for stability ---
    useEffect(() => {
        const onRideConfirmed = (ride) => {
            setVehicleFound(false);
            setWaitingForDriver(true);
            setRide(ride);
        };

        const onRideStarted = (ride) => {
            console.log("ride started");
            setWaitingForDriver(false);
            navigate('/riding', { state: { ride } });
        };

        socket.on('ride-confirmed', onRideConfirmed);
        socket.on('ride-started', onRideStarted);

        // Cleanup function to prevent duplicate listeners
        return () => {
            socket.off('ride-confirmed', onRideConfirmed);
            socket.off('ride-started', onRideStarted);
        };
    }, [socket, navigate]);


    const handlePickupChange = async (e) => {
        const newPickupValue = e.target.value;
        setPickup(newPickupValue);

        // FIX: Only search if the input is 3 or more characters long
        if (newPickupValue.length < 3) {
            setPickupSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-suggestions`, {
                params: { input: newPickupValue },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPickupSuggestions(response.data);
        } catch (error) {
            console.error("Pickup suggestion fetch error:", error);
            setPickupSuggestions([]);
        }
    };

    const handleDestinationChange = async (e) => {
        const newDestinationValue = e.target.value;
        setDestination(newDestinationValue);

        // FIX: Only search if the input is 3 or more characters long
        if (newDestinationValue.length < 3) {
            setDestinationSuggestions([]);
            return;
        }

        try {
            // FIX: Corrected environment variable
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/get-suggestions`, {
                params: { input: newDestinationValue },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setDestinationSuggestions(response.data);
        } catch (error) {
            console.error("Destination suggestion fetch error:", error);
            setDestinationSuggestions([]);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: panelOpen ? '70%' : '0%',
            padding: panelOpen ? 24 : 0,
            duration: 0.5,
            ease: 'power3.inOut'
        });
        gsap.to(panelCloseRef.current, {
            opacity: panelOpen ? 1 : 0,
            duration: 0.5
        });
    }, [panelOpen]);

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
            y: vehiclePanel ? '0%' : '100%',
            duration: 0.5,
            ease: 'power3.inOut'
        });
    }, [vehiclePanel]);

    useGSAP(() => {
        gsap.to(confirmRidePanelRef.current, {
            y: confirmRidePanel ? '0%' : '100%',
            duration: 0.5,
            ease: 'power3.inOut'
        });
    }, [confirmRidePanel]);

    useGSAP(() => {
        gsap.to(vehicleFoundRef.current, {
            y: vehicleFound ? '0%' : '100%',
            duration: 0.5,
            ease: 'power3.inOut'
        });
    }, [vehicleFound]);

    useGSAP(() => {
        gsap.to(waitingForDriverRef.current, {
            y: waitingForDriver ? '0%' : '100%',
            duration: 0.5,
            ease: 'power3.inOut'
        });
    }, [waitingForDriver]);

    async function findTrip() {
        if (pickup && destination) {
            setPanelOpen(false);
            setVehiclePanel(true);

            try {
                // FIX: Corrected environment variable
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/rides/get-fare`, {
                    params: { pickup, destination },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFare(response.data);
            } catch (error) {
                console.error("Error fetching fare:", error);
                // Optionally, show an error message to the user
            }
        }
    }

    async function createRide() {
        try {
            // FIX: Corrected environment variable
            await axios.post(`${import.meta.env.VITE_API_URL}/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            console.error("Error creating ride:", error);
        }
    }

    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5 z-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
            <div className='h-screen w-screen'>
                <LiveTracking />
            </div>
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-auto p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={submitHandler}>
                        <div className="line absolute h-16 w-1 top-1/2 -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                    <button onClick={findTrip} className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0 overflow-y-auto'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    );
};

export default Home;
