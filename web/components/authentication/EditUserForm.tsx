import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React, { DetailedHTMLProps, FormHTMLAttributes, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useUserById } from '@eventalapp/shared/hooks';
import { EditUserPayload, EditUserSchema, FullUser, copy, slugify } from '@eventalapp/shared/utils';

import { UseEditUserMutationData } from '../../hooks/mutations/useEditUser';
import { LoadingInner } from '../error/LoadingInner';
import AvatarUpload, { FileWithPreview } from '../form/AvatarUpload';
import { StyledEditor } from '../form/Editor';
import { ErrorMessage } from '../form/ErrorMessage';
import { Button } from '../primitives/Button';
import { HelpTooltip } from '../primitives/HelpTooltip';
import { Input } from '../primitives/Input';
import { Label } from '../primitives/Label';
import Tooltip from '../primitives/Tooltip';

type Props = {
	user: FullUser;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> &
	UseEditUserMutationData;

export const EditUserForm: React.FC<Props> = (props) => {
	const { user, editUserMutation } = props;
	const router = useRouter();
	const [files, setFiles] = React.useState<FileWithPreview[]>([]);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors }
	} = useForm<EditUserPayload>({
		defaultValues: {
			name: user?.name ?? undefined,
			slug: user?.slug ?? undefined,
			description: user?.description ?? undefined,
			location: user?.location ?? undefined,
			company: user?.company ?? undefined,
			position: user?.position ?? undefined,
			website: user?.website ?? undefined,
			email: user?.email ?? undefined
		},
		resolver: zodResolver(EditUserSchema)
	});

	const slugWatcher = watch('slug');

	const { data: userSlugCheck, isLoading: isUserSlugCheckLoading } = useUserById({
		uid: slugWatcher
	});

	useEffect(() => {
		setValue('slug', slugify(slugWatcher));
	}, [slugWatcher]);

	useEffect(() => {
		setValue('image', files[0]);
	}, [files]);

	//TODO: impl react skeleton
	if (!user) return null;

	return (
		<form
			onSubmit={handleSubmit((data) => {
				editUserMutation.mutate(data);
			})}
		>
			<div className="my-5 grid grid-flow-row-dense grid-cols-4 gap-5">
				<div className="col-span-2 row-span-2 md:col-span-1">
					<Label htmlFor="image">Image</Label>

					<Tooltip message={'Upload an image for your profile.'}>
						<div className="inline-block">
							<AvatarUpload
								files={files}
								setFiles={setFiles}
								placeholderImageUrl={user.image}
							/>
						</div>
					</Tooltip>

					{errors.image?.message && <ErrorMessage>{errors.image?.message}</ErrorMessage>}
				</div>

				<div className="col-span-4 md:col-span-3">
					<Label htmlFor="slug">
						Username *<HelpTooltip message={copy.tooltip.userSlug} />
					</Label>
					<div className="flex items-center">
						<span className="mr-1 text-base text-gray-700">evental.app/users/</span>
						<Input placeholder="user-slug" {...register('slug')} />
					</div>
					{errors.slug?.message && <ErrorMessage>{errors.slug?.message}</ErrorMessage>}
					{slugWatcher !== user?.slug && userSlugCheck && (
						<ErrorMessage>This username is already taken, please choose another</ErrorMessage>
					)}
				</div>

				<div className="col-span-4 md:col-span-3">
					<Label htmlFor="name">Name *</Label>
					<Input placeholder="User name" {...register('name')} />
					{errors.name?.message && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
				</div>

				<div className="col-span-4 md:col-span-2">
					<Label htmlFor="location">Location</Label>
					<Input placeholder="User location" {...register('location')} />
					{errors.location?.message && <ErrorMessage>{errors.location?.message}</ErrorMessage>}
				</div>

				<div className="col-span-4 md:col-span-2">
					<Label htmlFor="position">
						Position
						<HelpTooltip message={copy.tooltip.userPosition} />
					</Label>
					<Input placeholder="Position" {...register('position')} />
					{errors.position?.message && <ErrorMessage>{errors.position?.message}</ErrorMessage>}
				</div>

				<div className="col-span-4 md:col-span-2">
					<Label htmlFor="company">
						Company
						<HelpTooltip message={copy.tooltip.userCompany} />
					</Label>
					<Input placeholder="Company" {...register('company')} />
					{errors.company?.message && <ErrorMessage>{errors.company?.message}</ErrorMessage>}
				</div>

				<div className="col-span-4 md:col-span-2">
					<Label htmlFor="website">
						Website
						<HelpTooltip message={copy.tooltip.userWebsite} />
					</Label>
					<Input placeholder="Website" {...register('website')} />
					{errors.website?.message && <ErrorMessage>{errors.website?.message}</ErrorMessage>}
				</div>

				<div className="col-span-4">
					<Label>Email</Label>
					<Input placeholder="email@gmail.com" {...register('email')} />
				</div>

				<div className="col-span-4">
					<Label htmlFor="description">Description</Label>
					<Controller
						control={control}
						name="description"
						render={({ field }) => (
							<StyledEditor
								onChange={(value) => {
									field.onChange(value);
								}}
								content={field.value || ''}
							/>
						)}
					/>
					{errors.description?.message && (
						<ErrorMessage>{errors.description?.message}</ErrorMessage>
					)}
				</div>
			</div>

			<div className="flex flex-row justify-end">
				<Button type="button" variant="no-bg" onClick={router.back}>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="primary"
					className="ml-4"
					padding="medium"
					disabled={
						editUserMutation.isLoading ||
						isUserSlugCheckLoading ||
						Boolean(slugWatcher !== user?.slug && userSlugCheck)
					}
				>
					{editUserMutation.isLoading ? <LoadingInner /> : 'Save'}
				</Button>
			</div>
		</form>
	);
};
