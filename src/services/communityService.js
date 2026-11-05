import api from "./api";

export async function getAllCommunities() {
  const response = await api.get("/communities");
  return response.data;
}

export async function getCommunityById(communityId) {
  const response = await api.get(`/communities/${communityId}`);
  return response.data;
}

export async function createNewCommunity(newCommunity) {
  const response = await api.post("/communities", newCommunity);
  return response.data;
}

export async function updateCommunityById(communityId, updatedCommunity) {
  const response = await api.put(
    `/communities/${communityId}`,
    updatedCommunity
  );
  return response.data;
}

export async function deleteCommunityById(communityId) {
  const response = await api.delete(`/communities/${communityId}`);
  return response.data;
}

export async function joinCommunity(communityId) {
  const response = await api.put(
    `/communities/${communityId}/membership`
  );
  return response.data;
}

export async function leaveCommunity(communityId) {
  const response = await api.delete(
    `/communities/${communityId}/membership`
  );
  return response.data;
}