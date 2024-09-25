import { Member } from "@/models/db";

export async function printMember(userDetails?: Member) {
  const content = `

<div className="bg-white text-black" style={{backgroundColor:"white", color:"black"}}>
        <div id="print-bold" className="flex flex-col gap-3 text-xl font-semibold mb-8" >
        <h1 className="text-xl font-semibold" >The Church of Pentecost</h1>
        <h1 className="text-xl font-semibold">Korle-Bu English Assembly</h1>
        <h1 className="text-xl font-semibold">Dansoman Area</h1>
        </div>


      <div className="user-details flex items-center justify-between flex-col ap-3">
        <h1>User Details</h1>
        <p>Name: ${userDetails?.name}</p>
        <p>GhanaCardID: ${userDetails?.ghanaCardID}</p>
        <p>Contact: ${userDetails?.mobile}</p>
        <p>Contact Person: ${userDetails?.contactPerson}</p>
        <p>Address: ${userDetails?.residentialAddress}</p>
        <p>Cell: ${userDetails?.cell}</p>
        <p>Marital Status: ${userDetails?.maritalStatus}</p>
        <p>Spouse Name: ${userDetails?.spouseName}</p>
        <p>Remarks: ${userDetails?.Remarks}</p>

      </div>
    </div>
`;

  const originalContent = document.body.innerHTML;

  document.body.innerHTML = content;
  window.print();
  // Restore original content after print
  document.body.innerHTML = originalContent;
  window.location.reload(); // Reload to reset state
}
