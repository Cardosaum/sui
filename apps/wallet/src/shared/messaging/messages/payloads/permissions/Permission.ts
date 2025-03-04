// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { PermissionType } from './PermissionType';
import type { SuiAddress } from '@mysten/sui.js';

//TODO: add description, name, tags
//TODO add PageLink for instance where the origin and the wallet landing page are different.
export interface Permission {
    name?: string;
    id: string;
    origin: string;
    pagelink?: string;
    favIcon: string | undefined;
    accounts: SuiAddress[];
    allowed: boolean | null;
    permissions: PermissionType[];
    createdDate: string;
    responseDate: string | null;
    requestMsgID: string;
}
