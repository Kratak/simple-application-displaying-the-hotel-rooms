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

    const isPrevPageButtonDisable = displayedRoomsPage === 1
    const isNextPageButtonDisable = rooms.length < maxDisplayedRooms || displayedRoomsPage >= rooms.length / maxDisplayedRooms

    const  getRooms = async () => {
        await fetch(`${roomsApiKey}`)
            .then((res) => {
                return res.json()
            })
            .then((roomsData: Array<RoomProps>) => {
                const sortedRooms = roomsData
                    .map((room): RoomProps => ({...room, availabilityStatus: 'unknown'}))
                handleSortAndSetRooms(sortedRooms)
            })
            .catch(e => console.log(e))
    }

    const getRoomAvailability = async (id: number) => {
        await fetch(`${roomApiKey}/${id}`)
            .then((res) => {
                return res.json()
            })
            .then(({availabilityStatus, price}: RoomProps) => {
                setRooms(rooms.map(room => {
                    if (room.id === id){
                        return {...room, availabilityStatus, price: price !== null ? price : room.price }
                    }
                    return room
                }))
                setDisplayedRooms(displayedRooms.map(room => {
                    if (room.id === id){
                        return {...room, availabilityStatus, price: price !== null ? price : room.price }
                    }
                    return room
                }))
            })
            .catch(e => console.log(e))
    }

    const handleRoomSortToggle = () => () => {
        if (roomsSort === "DESC") {
            setRoomsSort("ASC")
        } else {
            setRoomsSort("DESC")
        }
    }

    const handleChangePage = (action: 'next' | 'prev') => ()=> {
        if (action === 'next') {
            setDisplayedRoomsPage(displayedRoomsPage + 1)
        } else {
            setDisplayedRoomsPage(displayedRoomsPage - 1)
        }
    }

    const handleSortAndSetRooms = (roomsData: Array<RoomProps>) => {
        const sortedRooms = roomsData
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
    }


    useEffect(() => {
        getRooms();
    }, []);

    useEffect(() => {
        handleSortAndSetRooms(rooms);
    }, [roomsSort, displayedRoomsPage]);

    return {
        displayedRooms,
        getRoomAvailability,
        displayedRoomsPage,
        handleChangePage,
        handleRoomSortToggle,
        roomsSort,
        isPrevPageButtonDisable,
        isNextPageButtonDisable
    }
}


export default useApi;
