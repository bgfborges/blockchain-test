import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Uploader from '.'
import { FilesProvider } from '../../contexts/uploadFile'

describe('Uploader Component', () => {

    it('should render the component', async () => {

        const { getByText  } = render(<Uploader />)
    
        expect(getByText('Upload Files (png, CSV - comma delimited)')).toBeInTheDocument()
    })

    it('should receive a png document in input', async () => {

        const { getByLabelText } = render(<Uploader />)

        // Input File on Uploader Component
        const input = getByLabelText('input-file') as HTMLInputElement

        // New png file to be inputed
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})

        await userEvent.upload(input, file)

        expect(input.files[0]).toBe(file)
        expect(input.files.item(0)).toBe(file)
        expect(input.files).toHaveLength(1)
    })
    
    it('should receive a csv document in input', async () => {

        const { getByLabelText } = render(<Uploader />)

        // Input File on Uploader Component
        const input = getByLabelText('input-file') as HTMLInputElement

        // New png file to be inputed
        const file = new File(['hello'], 'hello.csv', {type: 'text/csv'})

        await userEvent.upload(input, file)

        expect(input.files[0]).toBe(file)
        expect(input.files.item(0)).toBe(file)
        expect(input.files).toHaveLength(1)
    })
    
    it('should not receive different file than csv and png', async () => {

        const { getByLabelText } = render(<Uploader />)

        // Input File on Uploader Component
        const input = getByLabelText('input-file') as HTMLInputElement

        // New png file to be inputed
        const file = new File(['hello'], 'hello.gif', {type: 'image/gif'})

        await userEvent.upload(input, file)
        
        expect(input.files).not.toHaveLength(1)
    })

    it('should send the file to the context API', async () => {

        // Reset window.location
        let assignMock = jest.fn()
        delete window.location
        window.location = { href: assignMock as any } as Location

        const { getByLabelText } = render(<FilesProvider><Uploader /></FilesProvider>)

        // Input File on Uploader Component
        const input = getByLabelText('input-file') as HTMLInputElement

        // New png file to be inputed
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})

        await userEvent.upload(input, file)

        // Get Upload Button
        const uploadButton = screen.getByText('Upload')

        await userEvent.click(uploadButton)

        expect(window.location.href).toBe('/gallery')
    })

    // Write the test to check the amount of rows
})