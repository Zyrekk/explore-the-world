import {StartButton} from "../components/Home/StartButton"
import { render, screen } from '@testing-library/react-native';

describe("App component", () => {
    it("should render text", () => {
        // when
        render(<StartButton />)

        // then
        // expect(screen.getByText('Open up App.tsx to start working on your app!')).toBeTruthy()
    })
})
