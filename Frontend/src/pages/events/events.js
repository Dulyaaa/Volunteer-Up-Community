import { useEffect, useState } from 'react';
import axios from 'axios'
import { Event } from './event';
// import styles from './Events.module.css';

export default function Events() {
    const [{ loading, events }, setEventManagerState] = useState({
        loading: true,
        events: null,
    });

    const serverBaseUrl = 'http://localhost:8080';

    useEffect(() => {
        if (events) {
            return
        }

        axios.get(`${serverBaseUrl}/api/v1/events`)
            .then((response) => {
                setEventManagerState({
                    loading: false,
                    events: response.data.data.allEvents,
                });
            }).catch(err => {
                console.log(err)
            });
    }, [events]);

    console.log("hi", events)

    return (
        <section className=''>
            {events && events.length > 0 ? events.map((event) => (
                <Event event={event} key={event.entityId} />
            )) : <p>loading...</p>}
        </section>
    );
};