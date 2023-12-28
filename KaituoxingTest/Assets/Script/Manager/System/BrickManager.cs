using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Mime;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;
using UnityEngine.SceneManagement;

public class BrickManager : MonoBehaviour
{
    private static BrickManager _instance;
    
    public static BrickManager Instance
    {
        get { return _instance; }
    }

    public bool gamePass;
    public bool isPause;

    public bool isEmission;
    
    public GameObject passUI;
    public GameObject failUI;
    public GameObject pauseUI;
    
   

    public int numberOfBalls=0;
    
    public Text T_NumberOfBalls;

    private int numberOfBrick;

    void Awake()
    {
        _instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        GameObject[] Bricks = GameObject.FindGameObjectsWithTag("Brick");
        foreach (var item in Bricks)
        {
            var material=item.GetComponent<MeshRenderer>().material;
            material.color = Random.ColorHSV();
            // BrickType _BrickType = item.GetComponent<Brick>().myBrickType;
            // _BrickType = (BrickType)Random.Range(0, 3);
            // if (_BrickType==BrickType.None)
            // {
            //     material.color=Color.white;
            // }
            // else if(_BrickType==BrickType.AddBalls)
            // {
            //     material.color=Color.cyan;
            // } // else if(_BrickType==BrickType.AddSpeed)
            // {
            //     material.color=Color.yellow;    
            // } 
            // else if(_BrickType==BrickType.AddLife)
            // {
            //     material.color=Color.red;
            // }
        }

        if (numberOfBalls==0)
        {
            numberOfBalls = 3;
        }
        T_NumberOfBalls.text = $"剩余球数:{numberOfBalls}";

        numberOfBrick = Bricks.Length;
//        Debug.Log(numberOfBrick);
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Pause();
        }
    }

    public void CheckBrick()
    {
        numberOfBrick--;
        if (numberOfBrick==0)
        {
            gamePass = true;
            passUI.SetActive(true);
        }
    }

    public void Pause()
    {
        isPause = !isPause;
        if (isPause)
        {
            pauseUI.SetActive(true);
            Time.timeScale = 0;
        }
        else
        {
            pauseUI.SetActive(false);
            Time.timeScale = 1;
        }
    }
    
    
    public void ResetBall()
    {
        if (gamePass)
        {
            return;
        }
        if (numberOfBalls==0)
        {
            gamePass = true;
            failUI.SetActive(true);
        }
        else
        {
            numberOfBalls--;
            T_NumberOfBalls.text = $"剩余球数:{numberOfBalls}";
            isEmission = false;
        }
    }
    
    public void RestartGame()
    {
        gamePass = false;
        isPause = false;
        isEmission = false;
        passUI.SetActive(false);
        failUI.SetActive(false);
        pauseUI.SetActive(false);
        Time.timeScale = 1;
        GameEventManager.Instance.ClearEventListeners();
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
    
    public void BackToMain()
    {
        gamePass = false;
        isPause = false;
        isEmission = false;
        passUI.SetActive(false);
        failUI.SetActive(false);
        pauseUI.SetActive(false);
        Time.timeScale = 1;
        GameEventManager.Instance.ClearEventListeners();
        SceneManager.LoadScene(0);
    }
}
