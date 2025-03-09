import Table from 'react-bootstrap/Table';
import Candidate from '../interfaces/Candidate.interface.tsx';
import Button from 'react-bootstrap/Button';

const removeFromList = (event: React.MouseEvent<HTMLButtonElement>) => {
  const candidates: Candidate[] = JSON.parse(localStorage.getItem('candidates') || '[]');
  const candidateId = parseInt(event.currentTarget.getAttribute('data-candidate-id') || '0');
  const candidateIndex = candidates.findIndex(candidate => candidate.id === candidateId);
  candidates.splice(candidateIndex, 1);
  localStorage.setItem('candidates', JSON.stringify(candidates));
  event.currentTarget.parentElement?.parentElement?.remove();
}
const SavedCandidates = () => {
  const candidates: Candidate[] = JSON.parse(localStorage.getItem('candidates') || '[]');

  return (
    <div>
      <h1 style={{fontWeight: 'bold', textDecoration: 'underline', textAlign: 'center'}}>Potential Candidates</h1>

      {candidates.length > 0 ? (

        <Table striped bordered hover className='potentialCandidateTable'>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Github Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td style={{textAlign: 'center'}}><img alt='candidate github profile avatar' style={{height: '100%', width: '100%'}} src={candidate.avatar_url}></img></td>
              <td style={{textAlign: 'center'}}>{candidate.name || "-"}</td>
              <td style={{textAlign: 'center'}}><a style={{color: '#646cff'}} href={candidate.html_url}>{candidate.login}</a></td>
              <td style={{textAlign: 'center'}}>{candidate.location || "-"}</td>
              <td style={{textAlign: 'center'}}>{candidate.email || "-"}</td>
              <td style={{textAlign: 'center'}}>{candidate.company || "-"}</td>
              <td style={{textAlign: 'center'}}>{candidate.bio || "-"}</td>
              <td style={{textAlign: 'center'}}><Button onClick={removeFromList} style={{backgroundColor: 'red', color: 'white', border: 'white solid 1px', padding: '5px 10px', borderRadius: '5px'}}>Reject</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
  ) : (
    <h2 style={{fontWeight: 'bold', textAlign: 'center'}}>No candidates are currently saved, click the Home link above to view more.</h2>
  )}
    </div>
  );
};

export default SavedCandidates;
