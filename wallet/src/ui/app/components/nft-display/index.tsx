// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import cl from 'classnames';

import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import Icon, { SuiIcons } from '_components/icon';
import { useMiddleEllipsis, useNFTBasicData } from '_hooks';

import type { SuiObject as SuiObjectType } from '@mysten/sui.js';

import st from './NFTDisplay.module.scss';

export type NFTsProps = {
    nftobj: SuiObjectType;
    showlabel?: boolean;
    size?: 'small' | 'medium' | 'large';
    expandable?: boolean;
    wideview?: boolean;
};

function NFTDisplayCard({
    nftobj,
    showlabel,
    size = 'medium',
    expandable,
    wideview,
}: NFTsProps) {
    const { filePath, nftObjectID, nftFields, fileExtentionType } =
        useNFTBasicData(nftobj);

    const name = nftFields?.name || nftFields?.metadata?.fields?.name;
    const objIDShort = useMiddleEllipsis(nftObjectID);
    const nftType = useMiddleEllipsis(
        ('type' in nftobj.data && nftobj.data.type) || null,
        20,
        3
    );
    const displayTitle = name || objIDShort;

    const wideviewSection = (
        <div className={st.nftfields}>
            <div className={st.nftName}>{displayTitle}</div>
            <div className={st.nftType}>
                {fileExtentionType?.name} {fileExtentionType.type}
            </div>
        </div>
    );

    const defaultSection = (
        <>
            {expandable ? (
                <div className={st.expandable}>
                    <ExplorerLink
                        type={ExplorerLinkType.object}
                        objectID={nftObjectID}
                        showIcon={false}
                        className={st['explorer-link']}
                    >
                        View Image <Icon icon={SuiIcons.Preview} />
                    </ExplorerLink>
                </div>
            ) : null}
            {showlabel && displayTitle ? (
                <div className={st.nftfields}>{displayTitle}</div>
            ) : null}
        </>
    );

    return (
        <div
            className={cl(st.nftimage, wideview && st.wideview, st[size])}
            title={nftType}
        >
            {filePath ? (
                <img
                    className={cl(st.img)}
                    src={filePath}
                    alt={fileExtentionType?.name || 'NFT'}
                />
            ) : (
                <div className={st.noMedia}>
                    <Icon className={st.noMediaIcon} icon="slash-circle" />
                    <span>No media</span>
                </div>
            )}
            {wideview ? wideviewSection : defaultSection}
        </div>
    );
}

export default NFTDisplayCard;
