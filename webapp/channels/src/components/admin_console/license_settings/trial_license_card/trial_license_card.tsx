// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import moment from 'moment';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import type {ClientLicense} from '@mattermost/types/config';

import AlertBanner from 'components/alert_banner';
import ContactUsButton from 'components/announcement_bar/contact_sales/contact_us';
import FormattedMarkdownMessage from 'components/formatted_markdown_message';

import {daysToLicenseExpire} from 'utils/license_utils';
import {getBrowserTimezone} from 'utils/timezone';

import './trial_license_card.scss';

export interface Props {
    license: ClientLicense;
}

const TrialLicenseCard: React.FC<Props> = ({license}: Props) => {
    const currentDate = new Date();
    const endDate = new Date(parseInt(license?.ExpiresAt, 10));
    const daysToEndLicense = daysToLicenseExpire(license);

    const messageBody = () => {
        if (currentDate.toDateString() === endDate.toDateString()) {
            return (
                <FormattedMarkdownMessage
                    id='admin.license.trialCard.description.expiringToday'
                    defaultMessage='Your free trial expires **Today at {time}**. Visit our customer portal to purchase a license now to continue using Simulanis Connect Professional and Enterprise features after trial ends'
                    values={{
                        time: moment(endDate).endOf('day').format('h:mm a ') + moment().tz(getBrowserTimezone()).format('z'),
                    }}
                />
            );
        }

        return (
            <FormattedMarkdownMessage
                id='admin.license.trialCard.description'
                defaultMessage='Your free trial will expire in **{daysCount} {daysCount, plural, one {day} other {days}}**. Visit our customer portal to purchase a license now to continue using Simulanis Connect Professional and Enterprise features after trial ends.'
                values={{
                    daysCount: daysToEndLicense,
                }}
            />
        );
    };

    const message = (
        <div className='RenewLicenseCard TrialLicense'>
            <div className='RenewLicenseCard__text'>
                <div className='RenewLicenseCard__text-description'>
                    {messageBody()}
                </div>
                <div className='RenewLicenseCard__buttons'>
                    <ContactUsButton
                        customClass='contact_us_primary_cta'
                    />
                </div>
            </div>
        </div>
    );

    const cardTitle = (
        <FormattedMessage
            id='admin.license.trialCard.licenseExpiring'
            defaultMessage='You’re currently on a free trial of our Simulanis Connect Enterprise license.'
        />
    );
    return (
        <AlertBanner
            mode={'info'}
            title={cardTitle}
            message={message}
        />
    );
};

export default TrialLicenseCard;
