import Profile from '@components/Profile';
import { HANDLE_SUFFIX, LENSPROTOCOL_HANDLE } from '@lenster/data/constants';
import {
  CustomFiltersTypes,
  ProfileDocument,
  ProfileFeedDocument
} from '@lenster/lens';
import { lensApolloClient } from '@lenster/lens/apollo';
import type { GetServerSidePropsContext } from 'next';

export const config = {
  unstable_runtimeJS: false
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const handle = context.params?.handle;

  // Cache the response for 60 days
  context.res.setHeader('Cache-Control', 'public, max-age=5184000');

  if (!handle) {
    return {
      props: { data: null }
    };
  }

  let processedHandle;
  if (handle.includes(HANDLE_SUFFIX)) {
    processedHandle = handle;
  } else {
    processedHandle =
      handle === LENSPROTOCOL_HANDLE ? handle : handle.concat(HANDLE_SUFFIX);
  }
  const { data: profileData } = await lensApolloClient().query({
    query: ProfileDocument,
    variables: { request: { handle: processedHandle } }
  });

  if (profileData.profile) {
    const profileId = profileData.profile.id;
    const reactionRequest = { profileId };

    const { data: profilePublicationsData } = await lensApolloClient().query({
      query: ProfileFeedDocument,
      variables: {
        request: {
          profileId,
          customFilters: [CustomFiltersTypes.Gardeners],
          limit: 30
        },
        reactionRequest,
        profileId
      }
    });

    return {
      props: {
        profile: profileData.profile,
        publications: profilePublicationsData.publications?.items
      }
    };
  }

  return {
    props: { profile: null, publications: null }
  };
}

export default Profile;
