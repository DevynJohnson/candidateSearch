import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Card, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Candidate from '../interfaces/Candidate.interface';
import githubDark from '../assets/githubDark.svg';


function DisplayCandidate() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const users = await searchGithub();
        console.log('Users:', users);
        if (users.length > 0) {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          console.log('Random user:', randomUser);
          const candidateDetails = await searchGithubUser(randomUser.login);
          console.log('Candidate details:', candidateDetails
          );
          setCandidate(candidateDetails);
        }
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };
    
    fetchCandidate();
  }, []);
  
  return (
    candidate ? (
      <Card style={{ width: '18rem', display: 'flex', flexDirection: 'column', border: '2.5px solid black', backgroundColor: 'white', color: 'black'}}>
        <Card.Img style={{borderBottom: "2.5px solid black"}} variant="top" src={candidate.avatar_url || githubDark }/>
        <Card.Body>
          <Card.Title style={{color: "black", fontWeight: "bold", textAlign: 'center'}}>{candidate.name || "Name not provided"}</Card.Title>
          <Card.Text style={{color: "black", fontWeight: "bold", textAlign: 'center'}}>{candidate.login || "Username not available."}</Card.Text>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item style={{textAlign: 'center'}}>Location: {candidate.location || "No location provided"}</ListGroup.Item>
            <ListGroup.Item style={{textAlign: 'center'}}>Email: {candidate.email || "No email address provided"}</ListGroup.Item>
            <ListGroup.Item style={{textAlign: 'center'}}>Company: {candidate.company || "No company provided"}</ListGroup.Item>
            <ListGroup.Item style={{textAlign: 'center'}}>Bio: {candidate.bio || "No bio provided"}</ListGroup.Item>
          </ListGroup>
          <Card.Body style={{display: 'flex', justifyContent: 'space-between'}}>
          
    <Button variant="success" className="addOrRemoveButton" id="addButton" style={{backgroundColor: "green"}}>+</Button>
    <Button className="addOrRemoveButton" id="removeButton" variant="danger" style={{backgroundColor: "red"}}>-</Button>
 
        </Card.Body>
      </Card>
    ) : null
  );
}


const CandidateSearch = () => {
  return (
    <div className="candidateSearchPage d-flex justify-content-center align-items-center vh100">
      <h1>Candidate Search</h1>
      <div style={{display: "flex", justifyContent: "center"}}>
        <DisplayCandidate />
      </div>
    </div>
  );
};

export default CandidateSearch;