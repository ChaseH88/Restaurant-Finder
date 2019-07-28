import React, { useState } from "react";
import { Modal, Button, Image, Icon } from "semantic-ui-react";

const RestaurantPhotos = ({ photos }) => {
  
  const [modal, setModal] = useState(false);
  const [photoNum, setPhotoNum] = useState(null);

  return(
    photos.map(({ photo: { id, url, thumb_url } }, index) => (
      <Modal trigger={
        <Button className="modalImage" onClick={() => {
          setModal(true);
          setPhotoNum(index);
        }}>
          <Image src={thumb_url} size='small' bordered />
        </Button>}
        open={modal}
        onClose={() => setModal(false)}
      >
        {photoNum &&
          <Modal.Content image className={`TESTTTING___${index}`}>
            <div className='image'>
              <Image src={photos[photoNum].photo.url} size='large' />
            </div>
            <div>
              <Button color='green' onClick={() => { setModal(false); setPhotoNum(false) }} inverted>
                <Icon name='checkmark' /> Done
              </Button>
            </div>
          </Modal.Content>
        }
      </Modal>
    ))
  )
}

export default RestaurantPhotos;