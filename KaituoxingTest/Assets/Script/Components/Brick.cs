using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class Brick : MonoBehaviour
{
    public BrickType myBrickType;
    // Start is called before the first frame update
    void Start()
    {
       
        
    }

    // Update is called once per frame
    void Update()
    {
    }

    private void OnCollisionEnter(Collision other)
    {
        
    }
}

public enum BrickType
{
    None=0,
    AddBalls=1,
    AddLife=2,
    AddSpeed=3,
}