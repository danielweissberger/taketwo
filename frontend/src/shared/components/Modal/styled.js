import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    & .modal-header {
        padding: 10px;
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 10px;
`;

export const ModalContent = styled.div`
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid #8b8bb6;
`;

export const ModalBody = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
`;

export const ModalTitle = styled.h4`
    margin: auto;
    color: #8b8bb6;
`;

export const ModalButton = styled.button`
    height: 28px;
    cursor: pointer;
    border-radius: 2px;
    padding: 0px 17px;
    background: #8b8bb6;
    color: white;
    &:hover{
        opacity: .8;
    }
`;