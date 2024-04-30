import React from 'react';

type Props = {
    data: any
}

const PostList = (props: Props) => {
    const {data} = props;
    return (
        <>
            {data?.pages.map((group) =>
                group?.map((post) => (
                    <div key={post.slug}>
                        <h3>{post.title}</h3>
                    </div>
                ))
            )}
        </>
    )
}

export default PostList;