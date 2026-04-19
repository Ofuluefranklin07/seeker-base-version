import { createContext, useState } from "react";
export const Test = createContext(null)
export function MyTest({ children }) {
    const [title, setTitle] = useState('My greeting message')
    const [content, setContent] = useState('')
    const myBusiness = {
        header: 'this is the title of the project, more details would be shared in the content section',
        paragraph: 'RUPTVATE: are you looking for where to grow, ruptvate has go your back stick to business lines and  patterns and make sure you do not miss any of our lessons thank you.'
    }
    const value = { title, content, setContent, setTitle, myBusiness }

    return (<Test.Provider value={value}>{children}</Test.Provider>)
}
export default MyTest;