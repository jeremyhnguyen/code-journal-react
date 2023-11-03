import React, { useState } from 'react';
import { Entry, readEntries, removeEntry, updateEntry } from './data';
import { addEntry } from './data';
import { FaPencil } from 'react-icons/fa6';

export function CodeJournal() {
  const [isViewed, setIsViewed] = useState<boolean>(true);
  const [currentEntry, setCurrentEntry] = useState<Entry>();
  function handleView() {
    setIsViewed(!isViewed);
    setCurrentEntry(undefined);
  }
  function viewSwap(entry: Entry) {
    setIsViewed(!isViewed);
    setCurrentEntry(entry);
  }

  return (
    <>
      <div>
        <NavBar onClick={handleView} />
      </div>
      {isViewed ? (
        <EntryForm
          currentEntry={currentEntry}
          handleView={handleView}
        />
      ) : (
        <EntryList
          handleView={handleView}
          onViewSwap={viewSwap}
        />
      )}
    </>
  );
}
type NavProps = {
  onClick: () => void;
};
function NavBar({ onClick }: NavProps) {
  return (
    <>
      <header className="header purple-background">
        <div className="container">
          <div className="row">
            <div className="column-full d-flex align-center">
              <h1 className="white-text">Code Journal</h1>
              <h3>
                <a
                  onClick={onClick}
                  id="entriesLink"
                  className="entries-link white-text"
                  href="#">
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

type EntryFormProps = {
  handleView: () => void;
  currentEntry: Entry | undefined;
};

function EntryForm({
  handleView,
  currentEntry,
}: EntryFormProps) {
  const [title, setTitle] = useState<string>(currentEntry?.title ?? '');
  const [photoUrl, setPhotoUrl] = useState<string>(
    currentEntry?.photoUrl ?? ''
  );
  const [notes, setNotes] = useState<string>(currentEntry?.notes ?? '');
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentEntry === undefined) {
      const data = {
        title,
        photoUrl,
        notes,
      };
      addEntry(data);
    } else {
      const data = {
        entryId: currentEntry.entryId,
        title,
        photoUrl,
        notes,
      };
      updateEntry(data);
    }
    handleView();
  }

  function handleDelete() {
    if (currentEntry) {
      removeEntry(currentEntry.entryId);
      handleView();
    }
  }

  return (
    <>
      <div className="container" data-view="entry-form">
        <div className="row">
          <div className="column-full d-flex justify-between">
            <h1 id="formH1">
              {currentEntry === undefined ? 'New Entry' : 'Edit Entry'}
            </h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} id="entryForm">
          <div className="row margin-bottom-1">
            <div className="column-half">
              <img
                className="input-b-radius form-image"
                id="formImage"
                src={photoUrl ? photoUrl : '/placeholder-image-square.jpg'}
                alt="image of entry image"
              />
            </div>
            <div className="column-half">
              <label className="margin-bottom-1 d-block">Title</label>
              <input
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formTitle"
                name="formTitle"
              />
              <label className="margin-bottom-1 d-block">Photo URL</label>
              <input
                required
                value={photoUrl}
                onChange={(event) => setPhotoUrl(event.target.value)}
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formURL"
                name="formURL"
              />
            </div>
          </div>
          <div className="row margin-bottom-1">
            <div className="column-full">
              <label className="margin-bottom-1 d-block">Notes</label>
              <textarea
                required
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
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
                className={`${
                  currentEntry === undefined ? 'invisible' : ''
                } delete-entry-button pointer`}
                onClick={()=> setShowModal(true)}
                type="button"
                id="deleteEntry">
                Delete Entry
              </button>
              <button
                type="submit"
                className="input-b-radius text-padding purple-background white-text pointer">
                SAVE
              </button>
            </div>
          </div>
        </form>
        <article>
          <div
            id="modalContainer"
            className={`${
              !showModal ? 'hidden' : ''
            } modal-container d-flex justify-center align-center`}>
            <div className="modal row">
              <div className="column-full d-flex justify-center">
                <p>Are you sure you want to delete this entry?</p>
              </div>
              <div className="column-full d-flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="modal-button"
                  id="cancelButton">
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="modal-button red-background white-text"
                  id="confirmButton">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

type EntryListProps = {
  onViewSwap: (entry: Entry) => void;
  handleView: () => void;
};

function EntryList({
  onViewSwap,
  handleView,
}: EntryListProps) {
  const entries = readEntries();
  return (
    <>
      <div className="container" data-view="entries">
        <div className="row">
          <div className="column-full d-flex justify-between align-center">
            <h1>Entries</h1>
            <h3>
              <a
                onClick={handleView}
                id="formLink"
                className="white-text form-link"
                href="#">
                NEW
              </a>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="column-full">
            <ul className="entry-ul" id="entryUl">
              {entries.length !== 0 ? (
                entries.map((entry) => (
                  <EntryCard
                    onViewSwap={onViewSwap}
                    key={entry.entryId}
                    entry={entry}
                  />
                ))
              ) : (
                <li>No entries recorded</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

type EntryCardProps = {
  entry: Entry;
  onViewSwap: (entry: Entry) => void;
};
function EntryCard({ entry, onViewSwap }: EntryCardProps) {
  function handleEditClick() {
    onViewSwap(entry);
  }
  return (
    <li key={entry.entryId}>
      <div className="row">
        <div className="column-half">
          <img className="input-b-radius form-image" src={entry.photoUrl} />
        </div>
        <div className="column-half">
          <div className="row">
            <div className="column-full d-flex justify-between">
              <h3>{entry.title}</h3>
              <FaPencil
                className="pointer"
                onClick={handleEditClick}
                style={{ marginTop: '1rem' }}
              />
            </div>
          </div>
          <p>{entry.notes}</p>
        </div>
      </div>
    </li>
  );
}
