import App from "../../App"
import {render} from '@testing-library/react-native';


describe("render tests", () => {
    test("App.tsx renders correctly", () => {
       render(<App />)
    })
})
