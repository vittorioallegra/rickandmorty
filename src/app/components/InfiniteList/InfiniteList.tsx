import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../Spinner';

interface IProps {
    hasMore: boolean;
    items: React.ReactChild[];
    loadNext: () => void;
}

export const InfiniteList: React.FC<IProps> = (props) => (
    <div className="infinite-list">
        <InfiniteScroll
            dataLength={props.items.length}
            next={props.loadNext}
            hasMore={props.hasMore}
            loader={<Spinner position="relative" />}
        >
            {props.items}
        </InfiniteScroll>
    </div>
);
