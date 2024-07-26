import { api } from "@/redux/api/appSlice";
import { IProject, IProjects } from "@/types/project";
import { IShape } from "@/types/shape";

const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    createProject: builder.mutation<{ data: IProjects }, any>({
      query: (payload) => ({
        url: "/project/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["project"],
    }),
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
    getProject: builder.query<{ data: IProject | null }, string>({
      query: (id) => {
        return {
          url: `/project/get/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ["project"],
    }),
    getProjects: builder.query<{ data: IProjects[] | [] }, undefined>({
      query: () => {
        return {
          url: `/project/all`,
          method: "GET",
        };
      },
      providesTags: ["project"],
    }),
    updateProjectShape: builder.mutation({
      query: ({ id, shapes }: { id: string; shapes: IShape[] | [] }) => ({
        url: `/project/update/${id}`,
        method: "PUT",
        body: shapes,
      }),
    }),
    renameProject: builder.mutation({
      query: ({ id, projectName }: { id: string; projectName: string }) => ({
        url: `/project/rename/${id}`,
        method: "PUT",
        body: { projectName },
      }),
      invalidatesTags: ["project"],
    }),
    uploadImage: builder.mutation<{ data: string }, FormData>({
      query: (file) => ({
        url: `/project/upload/image`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["image"],
    }),
    getImages: builder.query<{ data: { url: string }[] }, undefined>({
      query: () => ({
        url: `/project/images`,
        method: "GET",
      }),
      providesTags: ["image"],
    }),
  }),
});
export const {
  useGetProjectQuery,
  useUpdateProjectShapeMutation,
  useUploadImageMutation,
  useCreateProjectMutation,
  useGetImagesQuery,
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useRenameProjectMutation,
} = projectApi;
