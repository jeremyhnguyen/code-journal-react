import { useState } from "react";

export function CodeJournal (){
  const [isViewed, setIsViewed] = useState<boolean>(true)
  function handleView(){
    setIsViewed(!isViewed)
  }
  return (
    <>
    <div>
{ isViewed ? <NavBar onClick={handleView}/> : <NavBarEntries onClick={handleView}/>}
  </div>
   {isViewed ? <EntryForm/> : <EntryList/> }
</>
  )
}
type NavProps = {
  onClick: ()=> void;
}
function NavBar({onClick}:NavProps){
  return (
    <>
      <header className="header purple-background">
        <div className="container">
          <div className="row">
            <div className="column-full d-flex align-center">
              <h1 className="white-text">Code Journal</h1>
              <h3>
                <a onClick={onClick} id="entriesLink" className="entries-link white-text" href="#">
                  Entries
                </a>
              </h3>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function NavBarEntries({onClick}:NavProps) {
  return (
    <>
      <header className="header purple-background">
        <div className="container">
          <div className="row">
            <div className="column-full d-flex align-center">
             <h1 >
               <a onClick={onClick} className="home white-text">Code Journal</a>
               </h1>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


function EntryForm(){
  return (
<>
<div className="container" data-view="entry-form">
        <div className="row">
          <div className="column-full d-flex justify-between">
            <h1 id="formH1">New Entry</h1>
          </div>
        </div>
        <form id="entryForm">
          <div className="row margin-bottom-1">
            <div className="column-half">
              <img
                className="input-b-radius form-image"
                id="formImage"
                src="/placeholder-image-square.jpg"
                alt="image of entry image" />
            </div>
            <div className="column-half">
              <label className="margin-bottom-1 d-block" >Title</label>
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formTitle"
                name="formTitle" />
              <label className="margin-bottom-1 d-block"
                >Photo URL</label
              >
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formURL"
                name="formURL" />
            </div>
          </div>
          <div className="row margin-bottom-1">
            <div className="column-full">
              <label className="margin-bottom-1 d-block"
                >Notes</label
              >
              <textarea
                required
                className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                name="formNotes"
                id="formNotes"
                cols={30}
                rows={10}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex justify-between">
              <button
                className="invisible delete-entry-button"
                type="button"
                id="deleteEntry">
                Delete Entry
              </button>
              <button
                className="input-b-radius text-padding purple-background white-text">
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div></>
  )
}

function EntryList(){
  return (
    <>
          <div className="container" data-view="entries">
        <div className="row">
          <div className="column-full d-flex justify-between align-center">
            <h1>Entries</h1>
            <h3>
              <a id="formLink" className="white-text form-link" href="#">NEW</a>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="column-full">
            <ul className="entry-ul" id="entryUl"></ul>
          </div>
        </div>
      </div>
    <article>
      <div
        id="modalContainer"
        className="modal-container d-flex justify-center align-center hidden">
        <div className="modal row">
          <div className="column-full d-flex justify-center">
            <p>Are you sure you want to delete this entry?</p>
          </div>
          <div className="column-full d-flex justify-between">
            <button className="modal-button" id="cancelButton">Cancel</button>
            <button
              className="modal-button red-background white-text"
              id="confirmButton">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </article>
   </>
  )
}