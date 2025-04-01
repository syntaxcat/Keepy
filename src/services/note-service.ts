import { utilService } from '@/services/util-service'
import { storageService } from '@/services/async-storage-service'
import type { Note, NoteType } from '@/types/note'

const NOTES_KEY = 'notes'
_createNotes()

export const noteService = {
  query,
  get,
  addNote,
  removeNote,
  updateNote,
  cloneNote,
}

function _createNotes(): Note[] {
  let notes = utilService.loadFromStorage(NOTES_KEY) as Note[]
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        type: "NoteTxt",
        titleTxt: "Problems",
        isPinned: true,
        info: {
          txt: "Cannot set properties of undefined",
        },
        style: {
          backgroundColor: "pink",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteTxt",
        titleTxt: "Do not forget..",
        isPinned: true,
        info: {
          txt: "Take a day off...",
        },
        style: {
          backgroundColor: "yellow",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteTxt",
        titleTxt: "Lorem..",
        isPinned: false,
        info: {
          txt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ducimus atque dicta maxime voluptas ullam maiores praesentium rerum amet doloremque minus, nobis aperiam ad eveniet sit debitis odio illo laudantium.",
        },
        style: {
          backgroundColor: "green",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteImg",
        titleTxt: "Meow",
        isPinned: false,
        info: {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnL-6fb5PhgkCkH3odiqgPmhqoWm6HeRjwQ&usqp=CAU",
        },
        style: {
          backgroundColor: "brown",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteTodos",
        titleTxt: "TODO:",
        isPinned: true,
        info: {
          todos: [
            {
              id: utilService.makeId(),
              txt: "Do not cry when console log prints undefined",
              isDone: false,
            },
            {
              id: utilService.makeId(),
              txt: "Do not cry when you fix a bug but then 10000 more appear",
              isDone: true,
            },
            {
              id: utilService.makeId(),
              txt: "Do not cry when it is ten minutes to submission and your project is far from being done",
              isDone: true,
            },
          ],
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteImg",
        titleTxt: "Panda",
        isPinned: true,
        info: {
          url: "https://addons-media.operacdn.com/media/CACHE/images/themes/45/123745/1.0-rev1/images/d43cd5fe-8407-46bb-858f-54d825dead48/c31dc78b6602cb4bf0a8d2b93385e5a2.jpg",
        },
        style: {
          backgroundColor: "green",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteImg",
        titleTxt: "Raccoon",
        isPinned: true,
        info: {
          url: "https://media.istockphoto.com/photos/little-raccoon-on-tree-picture-id514622028?k=6&m=514622028&s=612x612&w=0&h=oa6bEuRd9EB_D72qJ5UD57dBfnLWz7onQDm6DFJSVLc=",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteTxt",
        titleTxt: "Umm....",
        isPinned: false,
        info: {
          txt: "Learn Vue they said, it will be fun they said.",
        },
        style: {
          backgroundColor: "blue",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteImg",
        titleTxt: "Kuala",
        isPinned: true,
        info: {
          url: "https://ichef.bbci.co.uk/news/976/cpsprodpb/02C2/production/_122360700_gettyimages-1280424615.jpg",
        },
        style: {
          backgroundColor: "teal",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteVideo",
        titleTxt: "ZHU - Cercle",
        isPinned: true,
        info: {
          url: "https://www.youtube.com/embed/XHNHq1mC0VQ",
        },
        style: {
          backgroundColor: "red",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteTodos",
        titleTxt: "List:",
        isPinned: false,
        info: {
          todos: [
            {
              id: utilService.makeId(),
              txt: "Wake up early",
              isDone: false,
            },
            {
              id: utilService.makeId(),
              txt: "Make some css changes in my app",
              isDone: false,
            },
            {
              id: utilService.makeId(),
              txt: "Laugh more",
              isDone: true,
            },
          ],
        },
        style: {
          backgroundColor: "gray",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteImg",
        titleTxt: "Parrot buddy",
        isPinned: false,
        info: {
          url: "https://lafeber.com/pet-birds/wp-content/uploads/2020/04/gamaliel-troubleson-u9PsLITXMCQ-unsplash-e1587001975887.jpg",
        },
        style: {
          backgroundColor: "yellow",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteTxt",
        titleTxt: "My first note",
        isPinned: false,
        info: {
          txt: "Things aren’t always #000000 and #FFFFFF",
        },
        style: {
          backgroundColor: "darkBlue",
        },
      },
      {
        id: utilService.makeId(),
        type: "NoteVideo",
        titleTxt: "Ozora Festival",
        isPinned: false,
        info: {
          url: "https://www.youtube.com/embed/S3K6pUOAmTE",
        },
        style: {
          backgroundColor: "purple",
        },
      },
    ];
    utilService.saveToStorage(NOTES_KEY, notes)
  }
  return notes
}

function _createNote(noteData: {
  type: NoteType
  titleTxt: string
  info: any
}): Note {
  const note: Note = {
    id: utilService.makeId(),
    type: noteData.type,
    titleTxt: noteData.titleTxt,
    isPinned: true,
    info: noteData.info,
    style: {
      backgroundColor: '',
    },
  }
  return note
}

// function get(noteId: string): Promise<Note> {
//   return storageService.get(NOTES_KEY, noteId)
// }

function get(noteId: string): Promise<Note | undefined> {
  return storageService.get(NOTES_KEY, noteId)
}

// function query(): Promise<Note[]> {
//   return storageService.query(NOTES_KEY)
// }

function query(): Promise<Note[]> {
  return storageService.query(NOTES_KEY)
}


function addNote(noteData: {
  type: NoteType
  titleTxt: string
  info: any
}): Promise<Note> {
  const newNote = _createNote(noteData)
  return storageService.post(NOTES_KEY, newNote)
}

function removeNote(noteId: string): Promise<void> {
  return storageService.remove(NOTES_KEY, noteId)
}

function updateNote(note: Note): Promise<Note> {
  return storageService.put(NOTES_KEY, note)
}

function cloneNote(note: Note): Promise<Note> {
  const noteCopy = { ...note, id: utilService.makeId() }
  return storageService.post(NOTES_KEY, noteCopy)
}