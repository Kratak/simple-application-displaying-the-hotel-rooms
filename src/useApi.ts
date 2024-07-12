import {useEffect, useState} from "react";

const roomApiKey = process.env.REACT_APP_ROOM_API
const roomsApiKey = process.env.REACT_APP_ROOMS_API

type RoomAvailabilityStatus = "unknown" | "available" | "onRequest" | "soldout" | "error";
interface RoomProps {
    id: number;
    name: string;
    price: {
        currencyCode: string;
        value: number;
    }
    availabilityStatus: RoomAvailabilityStatus;
}

const displayRoomInitialPage = 1
const maxDisplayedRooms = 4;
const useApi = () => {

    const [rooms, setRooms] = useState<Array<RoomProps>>([]);
    const [roomsSort, setRoomsSort] = useState<"ASC"|"DESC">("ASC")
    const [displayedRooms, setDisplayedRooms  ] = useState<Array<RoomProps>>([]);
    const [displayedRoomsPage, setDisplayedRoomsPage] = useState(displayRoomInitialPage)

    const  getRooms = async () => {
        await fetch(`${roomsApiKey}`)
            .then((res) => {
                return res.json()
            })
            .then((roomsData: Array<RoomProps>) => {
                const sortedRooms = roomsData
                    .map((room): RoomProps => ({...room, availabilityStatus: 'unknown'}))
                    .sort((room, prevRoom) => {
                    if (roomsSort === "ASC") {
                        return room.price.value - prevRoom.price.value
                    }

                    if (roomsSort === "DESC") {
                        return prevRoom.price.value - room.price.value
                    }

                    return 1
                })
                setRooms(sortedRooms)
                setDisplayedRooms(sortedRooms.slice((displayedRoomsPage * maxDisplayedRooms) - maxDisplayedRooms, displayedRoomsPage * maxDisplayedRooms))
            })
            .catch(e => console.log(e))
    }

    const getRoomAvailability = async (id: number) => {
        await fetch(`${roomApiKey}/${id}`)
            .then((res) => {
                return res.json()
            })
            .then((roomData: RoomProps) => {
                setRooms(rooms.map(room => {
                    if (room.id === id){
                        return {...room, ...roomData }
                    }
                    return room
                }))
                setDisplayedRooms(displayedRooms.map(room => {
                    if (room.id === id){
                        return {...room, ...roomData }
                    }
                    return room
                }))
            })
            .catch(e => console.log(e))
    }

    const handleRoomSortToggle = () => {
        if (roomsSort === "DESC") {
            setRoomsSort("ASC")
        } else {
            setRoomsSort("DESC")
        }

    }


    useEffect(() => {
        getRooms();
    }, []);

    return {
        displayedRooms,
        handleRoomSortToggle,
        getRoomAvailability
    }
}


export default useApi;
