import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Card, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Candidate from "../interfaces/Candidate.interface.js";


function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Store all fetched candidates
  const [currentIndex, setCurrentIndex] = useState(0); // Track which candidate is being viewed
  const [noMoreCandidates, setNoMoreCandidates] = useState(false); // Track if there are no more candidates to view

  useEffect(() => {
    fetchCandidates(); // Run fetchCandidates method on component mount
  }, []);

  // Function to fetch a batch of candidates
  const fetchCandidates = async () => {
    try {
      const users = await searchGithub();
      // console.log("Users:", users);

      if (users.length > 0) {
        const userDetailsPromises = users.map((user: { login: string }) => searchGithubUser(user.login)); // Fetch details for all candidates
        const candidatesList = await Promise.all(userDetailsPromises); // Wait for all promises to resolve
        // console.log("Candidate details:", candidatesList);

        setCandidates(candidatesList); // Store all candidates
        setCurrentIndex(0); // Reset index back to 0
        setNoMoreCandidates(false); // Reset noMoreCandidates back to false
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Function to move to the next candidate
  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next candidate
    } else {
      setNoMoreCandidates(true); // If at the last candidate, fetch a new batch
    }
  };

  // Function to save candidate to local storage
  const saveCandidateToList = () => {
    if (candidates[currentIndex]) {
      const savedCandidates = JSON.parse(localStorage.getItem("candidates") || "[]");
      savedCandidates.push(candidates[currentIndex]);
      localStorage.setItem("candidates", JSON.stringify(savedCandidates));
      alert(`${candidates[currentIndex].name || candidates[currentIndex].login} has been added to the list!`);
    }
  };

  const candidate = candidates[currentIndex]; // Get the currently viewed candidate

  return (
    <div className="d-flex justify-content-center align-items-center">
  {noMoreCandidates ? (
    <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>
      There are no more candidates to view.<br />
      Please refresh the page to see more.
    </h2>
  ) : candidate ? (
    <Card
      style={{
        width: "18rem",
        display: "flex",
        flexDirection: "column",
        border: "2.5px solid black",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Card.Img
        style={{ borderBottom: "2.5px solid black", margin: "5px" }}
        variant="top"
        src={candidate.avatar_url}
        alt="Candidate avatar"
      />
      <Card.Body>
        <Card.Title style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>
          {candidate.name || "Name not provided"}
        </Card.Title>
        <Card.Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>
          {candidate.login || "Username not available."}
        </Card.Text>
        <Card.Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>
          GitHub: <a href={candidate.html_url} target="_blank" rel="noreferrer">
            {candidate.login}
          </a>
        </Card.Text>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item style={{ textAlign: "center", margin: "10px" }}>
          Location: {candidate.location || "No location provided"}
        </ListGroup.Item>
        <ListGroup.Item style={{ textAlign: "center", margin: "10px" }}>
          Email: {candidate.email || "No email address provided"}
        </ListGroup.Item>
        <ListGroup.Item style={{ textAlign: "center", margin: "10px" }}>
          Company: {candidate.company || "No company provided"}
        </ListGroup.Item>
        <ListGroup.Item style={{ textAlign: "center", margin: "10px" }}>
          Bio: {candidate.bio || "No bio provided"}
        </ListGroup.Item>
      </ListGroup>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", marginBottom: "10px" }}>
        <Button
          className="addOrRemoveButton"
          id="removeButton"
          style={{ backgroundColor: "red" }}
          onClick={nextCandidate}
        >
          View Next Candidate
        </Button>
        <Button
          className="addOrRemoveButton"
          id="addButton"
          style={{ backgroundColor: "green" }}
          onClick={() => { saveCandidateToList(); nextCandidate(); }}
        >
          Add Candidate to List
        </Button>
      </div>
    </Card>
  ) : (
    <h2 style={{ textAlign: "center", fontWeight: "bold", color: "gray" }}>
      Loading candidates...
    </h2>
  )}
</div>
);
}

export default CandidateSearch;