import { render } from '@testing-library/react'
import Uploader from '.'

test('sum', () => {

    const { getByText } = render(<Uploader />)

    expect(getByText('Upload Files (png, CSV - comma delimited)')).toBeTruthy()
})