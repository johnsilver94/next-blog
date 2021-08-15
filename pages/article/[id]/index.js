import Link from 'next/link'
import Meta from '../../../components/Meta'
import {server} from '../../../config/index'

const article = ({article}) => {
    return (
        <>
            <Meta title={article.title}/>
            <h1>
                {article.title}
            </h1>
            <p>{article.body}</p>
            <br />
            <Link href='/'>Go back</Link>
        </>
    )
}

export const getStaticProps = async(context) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`)

    const article = await res.json()
    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async() => {
    const res = await fetch(`${server}/api/articles`)

    const article = await res.json()

    const ids = article.map(article => article.id)

    const paths = ids.map(id => ({params: {id: id.toString()}}))
    return {
        paths,
        fallback: false
    }
}


export default article
