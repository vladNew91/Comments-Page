import FavoriteIcon from '@mui/icons-material/Favorite';

interface LikesComponentProps {
    likes: number;
}

export const LikesComponent: React.FC<LikesComponentProps> = ({
    likes
}: LikesComponentProps): JSX.Element => {
    return (
        <div style={{ display: 'flex' }}>
            <FavoriteIcon color='error' fontSize='small' />{likes}
        </div>
    );
};