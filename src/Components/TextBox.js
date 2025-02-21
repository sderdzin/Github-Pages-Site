// TextBox.js

export default class TextBox {
    constructor() {
        this.state = {
            text: '',
            isDragging: false,
            top: 0,
            left: 0,
            relX: 0,
            relY: 0
        };
    }

    handleMouseDown = (e) => {
        if (e.button !== 0) return;
        const { top, left } = this.state;
        this.setState({
            isDragging: true,
            relX: e.pageX - left,
            relY: e.pageY - top
        });
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        e.preventDefault();
    };

    handleMouseMove = (e) => {
        if (!this.state.isDragging) return;
        this.setState({
            top: e.pageY - this.state.relY,
            left: e.pageX - this.state.relX
        });
        e.preventDefault();
    };

    handleMouseUp = () => {
        this.setState({ isDragging: false });
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    };

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    };
}