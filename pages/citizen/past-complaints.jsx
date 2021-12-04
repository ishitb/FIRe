import { useRef, useState, useEffect } from 'react';
import cookies from 'react-cookies';
import CustomBackground from '../../components/CustomBackground';
import CitizenComplaint from '../../components/CitizenComplaint';
import Select from '../../components/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/PastComplaints.module.css';

const PastComplaints = () => {
    // let defaultComplaints = [
    //     {
    //         date: '2021-11-15T01:55',
    //         pinCode: '201314',
    //         id: '123456',
    //         place_of_incident: 'Dadri',
    //         slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //         details:
    //             'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad minus laboriosam debitis corporis hic rerum eligendi quae quasi beatae eaque excepturi asperiores a dolorum labore repudiandae assumenda eveniet quibusdam optio consequuntur voluptatum explicabo voluptates, rem alias et? Provident, non earum!',
    //         suspects:
    //             'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id perferendis, ratione nesciunt voluptatem tempora suscipit corrupti quas eaque alias ea ex quisquam dolore totam a et dicta repudiandae saepe earum dolor adipisci similique doloremque pariatur.',
    //         type: 'Dowry',
    //         status: 'Under Review',
    //     },
    //     {
    //         date: '2021-11-19T01:55',
    //         pinCode: '201314',
    //         id: '123457',
    //         place_of_incident: 'Sarita Vihar',
    //         slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //         type: 'Rape',
    //         status: 'Under Review',
    //     },
    //     {
    //         date: '2021-11-19T01:55',
    //         pinCode: '201314',
    //         id: '123458',
    //         place_of_incident: 'Hapur',
    //         slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //         type: 'Dowry',
    //         status: 'Under Review',
    //     },
    //     {
    //         date: '2021-11-19T01:55',
    //         pinCode: '201314',
    //         id: '123459',
    //         place_of_incident: 'Hapur',
    //         slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //         type: 'Dowry',
    //         status: 'Under Review',
    //     },
    //     {
    //         date: '2021-11-10T01:55',
    //         pinCode: '201314',
    //         id: '123450',
    //         place_of_incident: 'Sarita Vihar',
    //         slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //         type: 'Dowry',
    //         status: 'Under Review',
    //     },
    //     {
    //         date: '2021-11-19T01:55',
    //         pinCode: '201314',
    //         id: '123451',
    //         place_of_incident: 'Sarita Vihar',
    //         slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //         type: 'Dowry',
    //         status: 'Under Review',
    //     },
    // ];

    let dateInput = useRef();
    let submitRef = useRef();

    let [defaultComplaints, setDefaultComplaints] = useState([]);
    let [complaints, setComplaints] = useState(defaultComplaints);
    let [typeFilter, setTypeFilter] = useState({
        text: 'All',
        value: '',
    });
    let [placeFilter, setPlaceFilter] = useState('');
    let [dateFilter, setDateFilter] = useState(new Date('1970-01-01'));

    const getComplaints = async () => {
        const authToken = cookies.load('firetoken');

        fetch(`${process.env.NEXT_PUBLIC_API}/complaint`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (r) => {
                const response = await r.json();
                console.log(response);
                setDefaultComplaints(response);
                setComplaints(response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getComplaints();
    }, []);

    const filter = () => {
        setComplaints(
            defaultComplaints.filter((c) => {
                let date = new Date(c.date_time_of_incident);
                if (
                    c.incident_type
                        .toLowerCase()
                        .startsWith(typeFilter.value.toLowerCase()) &&
                    c.place_of_incident
                        .toLowerCase()
                        .startsWith(placeFilter.toLowerCase()) &&
                    new Date(
                        `${date.getFullYear()}-${
                            date.getMonth() + 1
                        }-${date.getDate()}`,
                    ) >= new Date(dateFilter)
                )
                    return c;
            }),
        );
    };

    const filterSubmit = (e) => {
        e.preventDefault();
        filter();
    };

    return (
        <CustomBackground>
            <div
                className={`background-black-translucent glass-effect border-radius-15 ${styles.pastComplaints}`}
            >
                <h1
                    className='heading-text foreground-white uppercase-text center-text'
                    style={{
                        height: '7.5%',
                    }}
                >
                    Past Complaints
                </h1>
                <form
                    onSubmit={filterSubmit}
                    className={`${styles.searchWrapper}`}
                >
                    <div className={`${styles.filter}`}>
                        <input
                            className={`${styles.inputText} w-45 foreground-white`}
                            type='text'
                            placeholder='Search Complaint with Place of Incident'
                            onChange={(e) => setPlaceFilter(e.target.value)}
                        />
                        <Select
                            placeholder='Choose type of Offense'
                            values={[
                                { text: 'All', value: '' },
                                { text: 'Rape', value: 'rape' },
                                { text: 'Harass', value: 'harass' },
                                { text: 'Dowry', value: 'dowry' },
                                { text: 'Theft', value: 'theft' },
                            ]}
                            defaultValue={{ text: 'All', value: '' }}
                            setValue={setTypeFilter}
                            classNames={`foreground-white w-45 ${styles.inputText}`}
                        />
                    </div>
                    <div className={`${styles.dateInput}`}>
                        <div className={`${styles.dateWrapper} w-75`}>
                            <label
                                htmlFor='date'
                                className='subheading-text foreground-primary'
                            >
                                Select Start Date
                            </label>
                            <input
                                ref={dateInput}
                                id='date'
                                className={`${styles.inputText} w-75 foreground-white`}
                                type='date'
                                placeholder='Select Date and Time of Incident'
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                            <div
                                className={`${styles.close}`}
                                onClick={() => {
                                    dateInput.current.value = '';
                                    setDateFilter(
                                        (curr) => new Date('1970-01-01'),
                                    );
                                    setComplaints(
                                        defaultComplaints.filter((c) => {
                                            let date = new Date(
                                                c.date_time_of_incident,
                                            );
                                            if (
                                                c.type_of_incident
                                                    .toLowerCase()
                                                    .startsWith(
                                                        typeFilter.value.toLowerCase(),
                                                    ) &&
                                                c.place_of_incident
                                                    .toLowerCase()
                                                    .startsWith(
                                                        placeFilter.toLowerCase(),
                                                    ) &&
                                                new Date(
                                                    `${date.getFullYear()}-${
                                                        date.getMonth() + 1
                                                    }-${date.getDate()}`,
                                                ) >= new Date('1970-01-01')
                                            )
                                                return c;
                                        }),
                                    );
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='submit-button w-25 border-radius-10'
                            ref={submitRef}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className={`${styles.complaints}`}>
                    {complaints.length > 0 ? (
                        complaints.map((complaint) => (
                            <CitizenComplaint
                                key={complaint.uid}
                                id={complaint.uid}
                                complaint={complaint}
                            />
                        ))
                    ) : (
                        <p className='subheading-text center-text foreground-error'>
                            No Results Found!
                        </p>
                    )}
                </div>
            </div>
        </CustomBackground>
    );
};

export default PastComplaints;
