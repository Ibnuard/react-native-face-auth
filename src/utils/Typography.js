import { Caption, Title, Subheading, Paragraph, Headline } from 'react-native-paper'

export const Typography = (type, text) => {
    switch (type) {
        case 'caption':
            return <Caption>{text}</Caption>
            break;
        case 'title':
            return <Title>{text}</Title>
            break;
        case 'subheading':
            return <Subheading>{text}</Subheading>
            break;
        case 'paragraph':
            return <Paragraph>{text}</Paragraph>
            break;
        case 'headline':
            return <Headline>{text}</Headline>
            break;
        default:
            return null
            break;
    }
}