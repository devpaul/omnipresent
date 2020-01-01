# API

## Credentials

### Authenticate

```javascript
{
	role: 'presenter' | 'sharer' | 'viewer';
	credentials: string;
}
```

## Screen

### Show Image

Sets the screen media to the specified image

```javascript
{
	type: 'image',
	url: string
}
```

### Show Deck

Sets the screen media to the specified deck

```javascript
{
	type: 'deck',
	currentSlide: number,
	slides: string[]
}
```

### Change Slide

Changes the current slide deck to the specified slide

```javascript
{
	type: 'changeSlide',
	slide: number
}
```

### Refresh Media

Requests the current media state is sent back to the requesting user

```javascript
{
	action: 'refreshMedia'
}
```

### Show Laser

Shows a laser pointer at specified coordinates

```javascript
{
	action: 'showLaser',
	position: {
		x: number,
		y: number
	}
}
```

### Hide Laser

Hides the laser pointer

```javascript
{
	action: 'hideLaser'
}
```

## Presenter

### Become Presenter

Become the presenter (requires previous authentication)

```javascript
{
	action: 'becomePresenter';
	models: string[];
}
```

models represent named models that make up the presenter's body (e.g. left, right, head)

### Leave Presenter

Leave the presenter role

```javascript
{
	action: 'leavePresenter';
}
```

### Update Pose

```javascript
{
	type: 'pose';
	models: {
		name: string;
		position: { x: number; y: number; z: number; };
		rotation: { x: number; y: number; z: number; };
	}[];
}
```
