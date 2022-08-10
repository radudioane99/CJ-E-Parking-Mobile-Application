using BusinessLayer.Interfaces;
using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using IronOcr;
using System;
using System.Collections.Generic;

namespace BusinessLayer.Repositories
{
    public class ImageRecognitionRepository : IImageRecognitionRepository
    {
        public string RecognizeImage(string path)
        {
            //Gray Image
            //var image = CvInvoke.Imread("C:\\Users\\radu.dioane\\Downloads\\curios.jpg");
            var image = CvInvoke.Imread(path);
            // Image<Gray, byte> segmentedImage = image.InRange(new Gray(180), new Gray(255));
            var grayImage = new Mat();
            var bfilterAppliedImage = new Mat();
            var cannyAppliedImage = new Mat();
            var edgeImage = new Mat();
            var thresholdImage = new Mat();
            VectorOfVectorOfPoint contours = new VectorOfVectorOfPoint();
            var hierarchy = new Mat();
            CvInvoke.CvtColor(image, grayImage, ColorConversion.Bgr2Gray);


            // CvInvoke.Threshold(image, thresholdImage, 150, 255, ThresholdType.BinaryInv);
            // thresholdImage.Save("C:\\Users\\radu.dioane\\Desktop\\Licenta_poze\\threshold.jpg");
            //Check
            //result.Save("C:\\Users\\radu.dioane\\Desktop\\Licenta_poze\\poza.jpg");


            // Aply filtering and edge detection

            CvInvoke.BilateralFilter(grayImage, bfilterAppliedImage, 11, 17, 17);
            CvInvoke.EdgePreservingFilter(bfilterAppliedImage, edgeImage, EdgePreservingFilterFlag.RecursFilter);
            edgeImage.Save("C:\\Users\\dioan\\Desktop\\Licenta_poze\\edgeImage.jpg");
            bfilterAppliedImage.Save("C:\\Users\\dioan\\Desktop\\Licenta_poze\\bilateral.jpg");

            CvInvoke.Canny(edgeImage, cannyAppliedImage, 120, 200); // aici schimbat 40 50

            cannyAppliedImage.Save("C:\\Users\\dioan\\Desktop\\Licenta_poze\\canny.jpg");


            // Find Contours and Apply Mask

            CvInvoke.FindContours(cannyAppliedImage, contours, hierarchy, RetrType.Tree, ChainApproxMethod.ChainApproxSimple);
            int count = contours.Size;
            VectorOfPoint location = new VectorOfPoint();
            Dictionary<int, double> shapeAreas = new Dictionary<int, double>();

            MCvScalar color = new MCvScalar(0, 0, 0);
            Image<Gray, Byte> image1 = new Image<Gray, byte>(image.Width, image.Height, new Gray(255));
            for (int i = 0; i < count; i++)
            {
                VectorOfPoint item = contours[i];
                VectorOfPoint aproxitem = new VectorOfPoint();

                CvInvoke.ApproxPolyDP(item, aproxitem, 20, true);
                double area = CvInvoke.ContourArea(contours[i]);
                if (area > 750)
                {
                    Console.WriteLine(area);
                    CvInvoke.DrawContours(image1, contours, i, color, -1, LineType.EightConnected);
                }


            }
            image1.Save("C:\\Users\\dioan\\Desktop\\Licenta_poze\\biggest.png");

            var Ocr = new IronTesseract();
            Ocr.Configuration.BlackListCharacters = "~`$#^*_}{][|\\qwertyuiopasdfghjklmnbvcxz";
            Ocr.Configuration.WhiteListCharacters = "QWERTYUIOPLKJHGFDSAZXCVBNM0123456789";
            Ocr.Configuration.TesseractVersion = TesseractVersion.Tesseract5;
            Ocr.Configuration.EngineMode = TesseractEngineMode.TesseractAndLstm;
            Ocr.Configuration.PageSegmentationMode = TesseractPageSegmentationMode.Auto;
            Ocr.Configuration.ReadBarCodes = false;
            Ocr.Language = OcrLanguage.English;
            using (var Input = new OcrInput("C:\\Users\\dioan\\Desktop\\Licenta_poze\\biggest.png"))
            {
                //Input.Binarize();
                //Input.Contrast();
                var Result = Ocr.Read(Input);
                Console.WriteLine("OCR: " + Result.Text);
                return Result.Text;
            }




            return "";
        }
    }
}
