import { NextApiRequest, NextApiResponse } from 'next'

enum Direction {
    Left = 2,
    Right = 1
}

type MotorState = {
  speed: number,
  direction: Direction,
  duration: number,
  timestamp : number,
}

const curState : MotorState = { speed: 300, direction: Direction.Left, duration: 30, timestamp: (new Date()).getTime()};

function handleGet(req: NextApiRequest, res: NextApiResponse<MotorState>)
{
	console.log('Client is trying to get data');
	res.status(200).json(curState);
}

function handlePost(req: NextApiRequest, res: NextApiResponse<MotorState>)
{
	console.log('Client is trying to post data');
	const postState : MotorState = req.body;
	postState.timestamp = (new Date()).getTime();
	console.log(postState);
	
	curState.speed = postState.speed;
	curState.direction = postState.direction;
	curState.duration = postState.duration;
	curState.timestamp = postState.timestamp;
	res.status(200).json(curState);
}

export default (req: NextApiRequest, res: NextApiResponse<MotorState>) => {
  const { method } = req
  switch(method) {
	  case 'GET': 
		handleGet(req, res);
        break;
	  case 'POST': 
		handlePost(req, res);
		break;
	  
  }
}