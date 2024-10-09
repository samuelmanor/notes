// import { useQuery, useMutation } from "@apollo/client";
// import { useEffect, useState } from "react";
// import {
//   ALL_PERSONS,
//   FIND_PERSON,
//   CREATE_PERSON,
//   EDIT_NUMBER,
// } from "../services/queries";

// const PhoneForm = ({ setError }) => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");

//   const [changeNumber, result] = useMutation(EDIT_NUMBER);

//   const submit = (event) => {
//     event.preventDefault();

//     changeNumber({ variables: { name, phone } });

//     setName("");
//     setPhone("");
//   };

//   useEffect(() => {
//     if (result.data && result.data.editNumber === null) {
//       setError("person not found");
//     }
//   }, [result.data]);

//   return (
//     <div>
//       <h2>change number</h2>

//       <form onSubmit={submit}>
//         name
//         <input value={name} onChange={({ target }) => setName(target.value)} />
//         phone
//         <input
//           value={phone}
//           onChange={({ target }) => setPhone(target.value)}
//         />
//         <button type="submit">change number</button>
//       </form>
//     </div>
//   );
// };

// const Person = ({ person, onClose }) => {
//   return (
//     <div>
//       <h3>{person.name}</h3>
//       <div>
//         {person.address.street} {person.address.city}
//       </div>
//       <div>{person.phone}</div>
//       <button onClick={onClose}>close</button>
//     </div>
//   );
// };

// const Persons = ({ persons }) => {
//   const [nameToSearch, setNameToSearch] = useState(null);
//   const result = useQuery(FIND_PERSON, {
//     variables: { nameToSearch },
//     skip: !nameToSearch,
//   });

//   if (nameToSearch && result.data) {
//     return (
//       <Person
//         person={result.data.findPerson}
//         onClose={() => setNameToSearch(null)}
//       />
//     );
//   }

//   return (
//     <div>
//       <h2>persons</h2>
//       {persons.map((p) => (
//         <div key={p.name}>
//           {p.name} {p.phone}
//           <button onClick={() => setNameToSearch(p.name)}>show address</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// const PersonForm = ({ setError }) => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");

//   const [createPerson] = useMutation(CREATE_PERSON, {
//     refetchQueries: [{ query: ALL_PERSONS }],
//     onError: (error) => {
//       const messages = error.graphQLErrors.map((e) => e.message).join("\n");
//       setError(messages);
//     },
//   });

//   const submit = (event) => {
//     event.preventDefault();

//     createPerson({ variables: { name, phone, street, city } });

//     setName("");
//     setPhone("");
//     setStreet("");
//     setCity("");
//   };

//   return (
//     <div>
//       <h2>create new</h2>
//       <form onSubmit={submit}>
//         <div>
//           name
//           <input
//             value={name}
//             onChange={({ target }) => setName(target.value)}
//           />
//         </div>
//         <div>
//           phone
//           <input
//             value={phone}
//             onChange={({ target }) => setPhone(target.value)}
//           />
//         </div>
//         <div>
//           street
//           <input
//             value={street}
//             onChange={({ target }) => setStreet(target.value)}
//           />
//         </div>
//         <div>
//           city
//           <input
//             value={city}
//             onChange={({ target }) => setCity(target.value)}
//           />
//         </div>
//         <button type="submit">add!</button>
//       </form>
//     </div>
//   );
// };

// const Notify = ({ errorMessage }) => {
//   if (!errorMessage) {
//     return null;
//   }

//   return <div style={{ color: "red" }}>{errorMessage}</div>;
// };

// const PhonebookGraphQL = () => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const result = useQuery(ALL_PERSONS);

//   if (result.loading) {
//     return <div>loading...</div>;
//   }

//   const notify = (message) => {
//     setErrorMessage(message);
//     setTimeout(() => {
//       setErrorMessage(null);
//     }, 10000);
//   };

//   return (
//     <div>
//       <Notify errorMessage={errorMessage} />
//       <Persons persons={result.data.allPersons} />
//       <PersonForm setError={notify} />
//       <PhoneForm setError={notify} />
//     </div>
//   );
// };

// export default PhonebookGraphQL;
